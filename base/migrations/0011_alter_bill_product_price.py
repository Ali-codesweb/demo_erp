# Generated by Django 4.1.7 on 2023-02-26 10:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_alter_bill_total_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='product_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=19),
        ),
    ]
