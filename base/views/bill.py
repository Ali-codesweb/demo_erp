from rest_framework.views import APIView
from rest_framework.response import Response
from base.serializers import BillSerializer
from base.models import Bill,ProductType,Product
class BillList(APIView):
    def get(self,request):
        bills = Bill.objects.all()
        serializer = BillSerializer(bills,many=True)
        return Response({'message':'ok','data':serializer.data})

    def post(self,request):
        data = request.data
        bill = Bill.objects.create(
            customer_name=data['customer_name'],
            customer_mobile = "",
        )
        for p in data['bill_items']:
            pt = ProductType.objects.get(item=p['item'])
            if p['quantity'] > pt.available:
                bill.delete()
                return Response({'message':f'Product {pt.item} not available'},status=401)
            else:
                Product.objects.create(
                    product=pt,
                    quantity=p['quantity'],
                    bill=bill
                )
                bill.product_price += pt.price * int(p['quantity'])
                bill.total_price += pt.price * int(p['quantity'])
                pt.available -= int(p['quantity'])
                pt.save()
        bill.save()
        serializer = BillSerializer(bill)
        return Response({'message':'ok','data':serializer.data})
    

    def put(self,request):
        data = request.data
        print(data)
        bill = Bill.objects.get(id=data['id'])
        bill.customer_name = data['customer_name']
        bill_products = Product.objects.filter(bill=bill)
        prod_price = 0
        for p in data['bill_items']:
            pt = ProductType.objects.get(item=p['item'])
            try:
                product = Product.objects.get(id=p['id'])
                is_delete = p.get('is_delete',None)
                
                if is_delete != None:
                    bill.product_price -= pt.price
                    pt.available += product.quantity
                    product.delete()
                else:
                    if p['quantity'] > product.quantity:
                        pt.available -= p['quantity']
                    else:
                        pt.available += p['quantity']
                    prod_price += pt.price * int(p['quantity'])
                    product.save()
            except:
                Product.objects.create(product=pt,quantity=p['quantity'],bill=bill)
                pt.available -= p['quantity']
                prod_price += pt.price * int(p['quantity'])
            
        bill.product_price = prod_price 
        bill.save()
        serializer = BillSerializer(bill)
        return Response({'message':'ok','data':serializer.data})


    def delete(self,request):
        id = request.data['id']
        Bill.objects.get(id=id).delete()
        return Response({'message':"ok"})