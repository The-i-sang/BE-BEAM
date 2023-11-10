from django.db import models
from .validator import validate_image_file_extension


def toolkits_image_upload_path(instance, filename):
    return f"toolkits/{instance.toolkits.title}/{filename}"


def toolkits_thumbnail_image_upload_path(instance, filename):
    return f"toolkits/{instance.title}/thumbnail/{filename}"


def toolkits_download_file_upload_path(instance, filename):
    return f"toolkits/{instance.title}/download/{filename}"


class ToolkitMainCategory(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name


class ToolkitSubCategory(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name


class Toolkits(models.Model):
    title = models.CharField(max_length=100)
    thumbnail_image = models.ImageField(
        upload_to=toolkits_thumbnail_image_upload_path,
        null=True,
        blank=True,
        validators=[
            validate_image_file_extension,
        ],
    )
    download_file = models.FileField(
        upload_to=toolkits_download_file_upload_path,
        null=True,
        blank=True,
    )
    description = models.TextField(blank=True, null=True)
    maincategory = models.ForeignKey(
        ToolkitMainCategory,
        on_delete=models.CASCADE,
        related_name="toolkits_maincategory",
    )
    subcategory = models.ForeignKey(
        ToolkitSubCategory,
        on_delete=models.CASCADE,
        related_name="toolkits_subcategory",
    )
    time = models.IntegerField()

    def __str__(self):
        return self.title


class ToolkitImage(models.Model):
    toolkits = models.ForeignKey(
        Toolkits, on_delete=models.CASCADE, related_name="toolkitimage_toolkit"
    )
    image = models.ImageField(
        upload_to=toolkits_image_upload_path,
        null=True,
        blank=True,
        validators=[
            validate_image_file_extension,
        ],
    )

    def __str__(self):
        return self.toolkits.title
