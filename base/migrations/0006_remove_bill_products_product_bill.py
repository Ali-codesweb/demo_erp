# Generated by Django 4.1.7 on 2023-02-26 10:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_alter_bill_product_price_alter_bill_total_price'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bill',
            name='products',
        ),
        migrations.AddField(
            model_name='product',
            name='bill',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.bill'),
        ),
    ]
