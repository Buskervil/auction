from rest_framework import routers
from django.urls import path
from .views import GoodViewSet, GoodImageViewSet, GoodCommentViewSet, AuctionViewSet, BetViewSet, OrderViewSet, UserViewSet, RegisterView, MyTokenObtainPairView, UserProfileViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'good', GoodViewSet, basename='goods')
router.register(r'image', GoodImageViewSet)
router.register(r'comment', GoodCommentViewSet)
router.register(r'auction', AuctionViewSet)
router.register(r'bet', BetViewSet)
router.register(r'order', OrderViewSet)
router.register(r'user', UserViewSet)
router.register(r'user-profile', UserProfileViewSet)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='my_token_ontain_pair'),
  # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register')
]

urlpatterns += router.urls
