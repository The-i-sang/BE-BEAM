from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes

from .serializer import ToolkitsSerializer

toolkit_list_docs = extend_schema(
    responses=ToolkitsSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="title",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Toolkit title",
        ),
        OpenApiParameter(
            name="description",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Toolkit description",
        ),
        OpenApiParameter(
            name="time",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="Toolkit time",
        ),
        OpenApiParameter(
            name="maincategory",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Toolkit maincategory",
        ),
        OpenApiParameter(
            name="subcategory",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="Toolkit subcategory",
        ),
    ],
)
