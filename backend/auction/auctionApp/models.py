from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Good(models.Model):
    title = models.CharField(max_length=128)
    description = models.TextField(max_length=1024, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, validators=[MinValueValidator(0)])
    published_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='goods')
    amount = models.IntegerField(validators=[MinValueValidator(0)], default=1)
    is_active = models.BooleanField(default=True)


class GoodImage(models.Model):
    image = models.ImageField()
    caption = models.CharField(max_length=128, blank=True)
    good = models.ForeignKey(
        Good, on_delete=models.CASCADE, related_name='images')


class GoodComment(models.Model):
    good = models.ForeignKey(
        Good, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name='comments', null=True)
    rating = models.IntegerField(default=5, validators=[
                                 MinValueValidator(1), MaxValueValidator(5)])
    comment = models.CharField(max_length=512, blank=True)


class Auction(models.Model):
    good = models.ForeignKey(
        Good, on_delete=models.CASCADE, related_name='auctions')
    started_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField()
    min_price = models.DecimalField(max_digits=12, decimal_places=2)
    closed = models.BooleanField(default=False)

    def close(this, user):
        if (this.good.user == user):
            this.closed = True


class Bet(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='bets')
    auction = models.ForeignKey(
        Auction, on_delete=models.CASCADE, related_name='bets')
    price = models.DecimalField(max_digits=12, decimal_places=2)
    is_final = models.BooleanField(default=False)


class Order(models.Model):
    good = models.ForeignKey(Good, on_delete=models.PROTECT)
    track_number = models.CharField(max_length=128)
    status = models.CharField(max_length=128)