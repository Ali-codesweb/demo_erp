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
            Product.objects.create(
                product=pt,
                quantity=p['quantity'],
                bill=bill
            )
        serializer = BillSerializer(bill)
        return Response({'message':'ok','data':serializer.data})