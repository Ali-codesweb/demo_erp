# Generated by Django 4.1.7 on 2023-02-26 10:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_remove_bill_products_product_bill'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='product_price',
            field=models.DecimalField(decimal_places=10, default=0, max_digits=19),
        ),
        migrations.AlterField(
            model_name='bill',
            name='total_price',
            field=models.DecimalField(decimal_places=10, default=0, max_digits=19),
        ),
    ]