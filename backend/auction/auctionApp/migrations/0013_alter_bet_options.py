# Generated by Django 4.0.5 on 2022-06-12 12:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auctionApp', '0012_alter_userprofile_owner'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bet',
            options={'ordering': ['-created_at']},
        ),
    ]
