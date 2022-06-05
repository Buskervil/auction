from django.contrib import admin
from .models import Good, GoodImage, GoodComment, Auction, Bet, Order

# Register your models here.
admin.site.register(Good)
admin.site.register(GoodImage)
admin.site.register(GoodComment)
admin.site.register(Auction)
admin.site.register(Bet)
admin.site.register(Order)

