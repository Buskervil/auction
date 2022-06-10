from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

from .permissions import IsOwnerOrReadOnly
from .models import Good, GoodImage, GoodComment, Auction, Bet, Order, UserProfile
from .serializers import GoodSerializer, GoodImageSerializer, GoodCommentSerializer, AuctionSerializer, BetSerializer, OrderSerializer, UserSerializer, RegisterSerializer, MyTokenObtainPairSerializer, UserProfileSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GoodViewSet(viewsets.ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

class GoodImageViewSet(viewsets.ModelViewSet):
    queryset = GoodImage.objects.all()
    serializer_class = GoodImageSerializer

class GoodCommentViewSet(viewsets.ModelViewSet):
    queryset = GoodComment.objects.all()
    serializer_class = GoodCommentSerializer

class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer

class BetViewSet(viewsets.ModelViewSet):
    queryset = Bet.objects.all()
    serializer_class = BetSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer    

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer