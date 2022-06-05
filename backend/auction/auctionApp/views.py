from django.shortcuts import render
from rest_framework import viewsets

from .models import Good, GoodImage, GoodComment, Auction, Bet, Order
from .serializers import GoodSerializer, GoodImageSerializer, GoodCommentSerializer, AuctionSerializer, BetSerializer, OrderSerializer


class GoodViewSet(viewsets.ModelViewSet):
    queryset = Good.objects.all()
    serializer_class = GoodSerializer

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