# Generated by Django 4.1.7 on 2023-02-26 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProductType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('guid', models.IntegerField(null=True, unique=True)),
                ('available', models.IntegerField(default=0)),
                ('description', models.TextField(max_length=1500)),
            ],
        ),
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_name', models.CharField(max_length=60)),
                ('customer_mobile', models.CharField(max_length=12)),
                ('product_price', models.DecimalField(decimal_places=10, max_digits=19)),
                ('total_price', models.DecimalField(decimal_places=10, max_digits=19)),
                ('products', models.ManyToManyField(to='base.producttype')),
            ],
            options={
                'verbose_name': 'Bill',
                'verbose_name_plural': 'Bills',
            },
        ),
    ]
