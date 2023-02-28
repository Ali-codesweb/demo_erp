from django.urls import path,include
from base.views import bill
urlpatterns = [
    path('',bill.BillList.as_view())
]
