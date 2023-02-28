from rest_framework import serializers
from base.models import *

class BillSerializer(serializers.ModelSerializer):
    bill_items = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Bill
        fields = '__all__'

    def get_bill_items(self,obj):
        bill_items = []
        products:Product = Product.objects.filter(bill=obj)
        for p in products:
            bill_items.append({
                'item':p.product.name,
                'quantity':p.quantity,
            })
        return bill_items
    
class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'