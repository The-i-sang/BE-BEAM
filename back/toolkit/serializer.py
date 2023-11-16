from rest_framework import serializers

from .models import Toolkits, ToolkitImage, ToolkitMainCategory, ToolkitSubCategory


class ToolkitMainCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolkitMainCategory
        fields = "__all__"


class ToolkitSubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolkitSubCategory
        fields = "__all__"


class ToolkitImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ToolkitImage
        fields = ["image"]


class ToolkitsSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        image = obj.toolkitimage_toolkit.all()
        return ToolkitImageSerializer(instance=image, many=True).data

    class Meta:
        model = Toolkits
        fields = "__all__"

    def create(self, validated_data):
        instance = Toolkits.objects.create(validated_data)
        image_set = self.context["request"].FILES
        for imange_data in image_set.getlist("image"):
            ToolkitImage.objects.create(Toolkits=instance, image=imange_data)
        return instance
