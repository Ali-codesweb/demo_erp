from django.urls import path
from base.views import product_type
urlpatterns = [
    path('',product_type.ProductTypeList.as_view())
]
