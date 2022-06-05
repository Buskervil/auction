from rest_framework import routers
from .views import GoodViewSet, GoodImageViewSet, GoodCommentViewSet, AuctionViewSet, BetViewSet, OrderViewSet


router = routers.DefaultRouter()
router.register(r'good', GoodViewSet)
router.register(r'image', GoodImageViewSet)
router.register(r'comment', GoodCommentViewSet)
router.register(r'auction', AuctionViewSet)
router.register(r'bet', BetViewSet)
router.register(r'order', OrderViewSet)

urlpatterns = []

urlpatterns += router.urls