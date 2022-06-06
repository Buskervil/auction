# Generated by Django 4.0.5 on 2022-06-05 13:01

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctionApp', '0002_alter_auction_closed_at_alter_auction_started_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='good',
            name='amount',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]