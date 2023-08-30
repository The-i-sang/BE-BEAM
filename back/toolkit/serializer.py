from rest_framework import serializers

from .models import Toolkit, ToolkitImage


class ToolkitImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = ToolkitImage
        fields = ["image"]


class ToolkitSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        image = obj.toolkitimage_set.all()
        return ToolkitImageSerializer(instance=image, many=True).data

    class Meta:
        model = Toolkit
        fields = "__all__"

    def create(self, validated_data):
        instance = Toolkit.objects.create(validated_data)
        image_set = self.context["request"].FILES
        for imange_data in image_set.getlist("image"):
            ToolkitImage.objects.create(Toolkit=instance, image=imange_data)
        return instance
