from django.db import models

# Create your models here.
class NVDIMM(models.Model):
    bw = models.IntegerField(default='x')
    lat = models.IntegerField(default='x')
    iops = models.IntegerField(default='x')
    def __str__(self):
        return "{} {} {}".format(self.bw,self.lat,self.iops)

# Create your models here.
class NVME(models.Model):
    bw = models.IntegerField(default='x')
    lat = models.IntegerField(default='x')
    iops = models.IntegerField(default='x')
    def __str__(self):
        return "{} {} {}".format(self.bw,self.lat,self.iops)
