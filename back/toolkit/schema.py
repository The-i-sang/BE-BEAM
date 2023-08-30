from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .serializer import ToolkitSerializer

toolkit_list_docs = extend_schema(
    responses=ToolkitSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="name",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Toolkit name",
        ),
        OpenApiParameter(
            name="description",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Toolkit description",
        ),
    ],
)
