# Generated by Django 4.1.7 on 2023-02-28 09:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_bill_product_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producttype',
            old_name='name',
            new_name='item',
        ),
    ]
