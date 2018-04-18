from django.contrib import admin

# Register your models here.
class NVDIMMModelAdmin(admin.ModelAdmin):
    list_display = ["bw","lat","iops"]
    search_fields = list_display
from .models import NVDIMM
admin.site.register(NVDIMM,NVDIMMModelAdmin)


class NVMEModelAdmin(admin.ModelAdmin):
    list_display = ["bw","lat","iops"]
    search_fields = list_display
from .models import NVME
admin.site.register(NVME,NVMEModelAdmin)
