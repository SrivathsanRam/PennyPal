# Generated by Django 5.1.4 on 2024-12-21 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='email',
        ),
        migrations.AddField(
            model_name='transaction',
            name='mobile_number',
            field=models.CharField(max_length=12, null=True),
        ),
    ]