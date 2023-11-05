from django.contrib import admin
from .models import Toolkits, ToolkitImage, ToolkitMainCategory, ToolkitSubCategory

admin.site.register(Toolkits)
admin.site.register(ToolkitImage)
admin.site.register(ToolkitMainCategory)
admin.site.register(ToolkitSubCategory)
