# Generated by Django 4.1.7 on 2023-02-26 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_bill_product_price_alter_bill_total_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='product_price',
            field=models.DecimalField(decimal_places=10, max_digits=19),
        ),
        migrations.AlterField(
            model_name='bill',
            name='total_price',
            field=models.DecimalField(decimal_places=10, max_digits=19),
        ),
    ]
