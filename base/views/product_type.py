from rest_framework.views import APIView
from rest_framework.response import Response
from base.serializers import ProductTypeSerializer
from base.models import ProductType
class ProductTypeList(APIView):
    def get(self,request):
        product_type = ProductType.objects.all()
        serializer = ProductTypeSerializer(product_type,many=True)
        return Response({'message':'ok','data':serializer.data})