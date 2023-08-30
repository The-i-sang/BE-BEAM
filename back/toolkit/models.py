from django.db import models
from .validator import validate_image_file_extension


def toolkit_image_upload_path(instance, filename):
    return f"toolkit/{instance.toolkit.name}/{filename}"


class ToolkitMainCategory(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name


class ToolkitSubCategory(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name


class Toolkit(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    maincategory = models.ForeignKey(
        ToolkitMainCategory,
        on_delete=models.CASCADE,
        related_name="toolkit_maincategory",
    )
    subcategory = models.ForeignKey(
        ToolkitSubCategory,
        on_delete=models.CASCADE,
        related_name="toolkit_subcategory",
    )
    time = models.IntegerField()

    def __str__(self):
        return self.name


class ToolkitImage(models.Model):
    toolkit = models.ForeignKey(
        Toolkit, on_delete=models.CASCADE, related_name="toolkitimage_toolkit"
    )
    image = models.ImageField(
        upload_to=toolkit_image_upload_path,
        null=True,
        blank=True,
        validators=[
            validate_image_file_extension,
        ],
    )

    def __str__(self):
        return self.toolkit.name
