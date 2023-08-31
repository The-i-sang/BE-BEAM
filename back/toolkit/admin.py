from django.contrib import admin
from .models import Toolkit, ToolkitImage, ToolkitMainCategory, ToolkitSubCategory

admin.site.register(Toolkit)
admin.site.register(ToolkitImage)
admin.site.register(ToolkitMainCategory)
admin.site.register(ToolkitSubCategory)
