from rest_framework.response import Response
from .serializer import (
    ToolkitsSerializer,
    ToolkitMainCategorySerializer,
    ToolkitSubCategorySerializer,
)
from rest_framework import viewsets
from .models import Toolkits, ToolkitMainCategory, ToolkitSubCategory
from drf_spectacular.utils import extend_schema
from .schema import toolkit_list_docs


class ToolkitsViewSet(viewsets.ViewSet):
    queryset = Toolkits.objects.all()

    @toolkit_list_docs
    def list(self, request):
        toolkit_name = request.query_params.get("name")
        toolkit_maincategory = request.query_params.get("maincategory")
        toolkit_subcategory = request.query_params.get("subcategory")
        toolkit_time = request.query_params.get("time")

        if toolkit_name:
            self.queryset = self.queryset.filter(name=toolkit_name)
        if toolkit_maincategory:
            self.queryset = self.queryset.filter(maincategory=toolkit_maincategory)
        if toolkit_subcategory:
            self.queryset = self.queryset.filter(subcategory=toolkit_subcategory)
        if toolkit_time:
            self.queryset = self.queryset.filter(time=toolkit_time)

        serializer = ToolkitsSerializer(self.queryset, many=True)
        return Response(serializer.data)
