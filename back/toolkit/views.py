from rest_framework.response import Response
from .serializer import ToolkitSerializer
from rest_framework import viewsets
from .models import Toolkit
from drf_spectacular.utils import extend_schema
from .schema import toolkit_list_docs


class ToolkitViewSet(viewsets.ViewSet):
    queryset = Toolkit.objects.all()

    @toolkit_list_docs
    def list(self, request):
        toolkit_name = request.query_params.get("name")
        toolkit_maincategory = request.query_params.get("maincategory")
        toolkit_subcategory = request.query_params.get("subcategory")
        toolkit_time = request.query_params.get("time")

        if toolkit_name:
            self.queryset = self.queryset.filter(name=toolkit_name)
        if toolkit_maincategory:
            self.queryset = self.queryset.filter(category=toolkit_maincategory)
        if toolkit_subcategory:
            self.queryset = self.queryset.filter(category=toolkit_subcategory)
        if toolkit_time:
            self.queryset = self.queryset.filter(time=toolkit_time)

        serializer = ToolkitSerializer(self.queryset, many=True)
        return Response(serializer.data)
