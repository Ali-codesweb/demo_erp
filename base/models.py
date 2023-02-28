from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import MaxValueValidator, MinValueValidator 
# Create your models here.

class ProductType(models.Model):
    guid = models.IntegerField(unique=True,null=True)
    name = models.CharField(max_length=100,default="")
    available = models.IntegerField(default=0)
    description = models.TextField(max_length=1500)
    price = models.IntegerField(default=0, validators=[MinValueValidator(1), MaxValueValidator(100)])

    def __str__(self):
        return self.name

class Product(models.Model):
    product = models.ForeignKey(ProductType,null=True,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    bill = models.ForeignKey("Bill",on_delete=models.CASCADE,null=True)

    def save(self, *args, **kwargs) -> None:
        self.bill.product_price += self.product.price * self.quantity
        self.product.available -= self.quantity
        self.bill.save()
        self.product.save()
        return super().save()


class Bill(models.Model):
    customer_name = models.CharField(max_length=60)
    customer_mobile = models.CharField(max_length=12)
    product_price = models.DecimalField(max_digits=19, decimal_places=2,default=0)
    total_price = models.DecimalField(max_digits=19, decimal_places=2,default=0)


    class Meta:
        verbose_name = "Bill"
        verbose_name_plural = "Bills"

    def __str__(self):
        return self.customer_name
