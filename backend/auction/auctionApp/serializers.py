# backend/notes/serializers.py
from rest_framework import serializers

from .models import Good, GoodComment, GoodImage, Auction, Bet, Order


class GoodSerializer(serializers.ModelSerializer):

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