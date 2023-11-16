from django.db import models
from django.contrib.postgres.fields import ArrayField
from .validator import validate_image_file_extension


def toolkit_image_upload_path(instance, filename):
    return f"toolkit/{instance.toolkit.title}/{filename}"


def toolkit_thumbnail_image_upload_path(instance, filename):
    return f"toolkit/{instance.title}/thumbnail/{filename}"


def toolkit_square_image_upload_path(instance, filename):
    return f"toolkit/{instance.title}/square/{filename}"


def toolkit_download_file_upload_path(instance, filename):
    return f"toolkit/{instance.title}/download/{filename}"


class ToolkitMainCategory(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name


class ToolkitSubCategory(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name


class Toolkit(models.Model):
    title = models.CharField(max_length=100)
    creator = models.CharField(max_length=100)
    alt = models.TextField(blank=True)
    keyword = ArrayField(models.CharField(max_length=100), blank=True)
    benefit = ArrayField(models.CharField(max_length=100), blank=True)
    thumbnail_image = models.ImageField(
        upload_to=toolkit_thumbnail_image_upload_path,
        null=True,
        blank=True,
        validators=[
            validate_image_file_extension,
        ],
    )
    square_image = models.ImageField(
        upload_to=toolkit_square_image_upload_path,
        null=True,
        blank=True,
        validators=[
            validate_image_file_extension,
        ],
    )
    download_file = models.FileField(
        upload_to=toolkit_download_file_upload_path,
        null=True,
        blank=True,
    )
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
    time = models.CharField(max_length=50)
    level = models.CharField(max_length=50)

    def __str__(self):
        return self.title


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
        return self.toolkit.title
