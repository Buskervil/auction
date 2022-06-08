# backend/notes/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Good, GoodComment, GoodImage, Auction, Bet, Order
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    goods_count = serializers.SerializerMethodField()
    orders_count = serializers.SerializerMethodField()

    def get_goods_count(self, obj):
        return obj.goods.filter(is_active=True).count()

    def get_orders_count(self, obj):
        return obj.orders.filter(status=2).count()

    class Meta:
        model = User
        exclude = ['password', 'is_superuser',
                   'is_staff', 'groups', 'user_permissions']


class GoodSerializer(serializers.HyperlinkedModelSerializer):
    images = serializers.PrimaryKeyRelatedField(
        many=True, queryset=GoodImage.objects.all())
    comments = serializers.PrimaryKeyRelatedField(
        many=True, queryset=GoodComment.objects.all())
    orders_count = serializers.SerializerMethodField()

    def get_orders_count(self, obj):
        return obj.orders.count()

    class Meta:
        model = Good
        fields = '__all__'


class GoodCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = GoodComment
        fields = '__all__'


class GoodImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = GoodImage
        fields = '__all__'


class AuctionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Auction
        fields = '__all__'


class BetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bet
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user
