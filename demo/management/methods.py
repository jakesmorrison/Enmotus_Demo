from ..models import NVDIMM
from ..models import NVME
import os,signal
import subprocess


class Methods():
    def retrieve_data():
        instance_NVDIMM = NVDIMM.objects.first()
        instance_NVME= NVME.objects.first()


        perf_para={
            'val_nvdimm_iops': 0,
            'val_nvdimm_lat': 0,
            'val_nvdimm_bw': 0,
            'val_nvme_iops': 0,
            'val_nvme_lat': 0,
            'val_nvme_bw': 0,
        }

        if instance_NVDIMM is not None:
            data = [int(x) for x in str(instance_NVDIMM).split(" ")]
            perf_para["val_nvdimm_iops"] = data[2]
            perf_para["val_nvdimm_lat"] = data[1]
            perf_para["val_nvdimm_bw"] = data[0]
            instance_NVDIMM.delete()

        if instance_NVME is not None:
            data = [int(x) for x in str(instance_NVME).split(" ")]
            perf_para["val_nvme_iops"] = data[2]
            perf_para["val_nvme_lat"] = data[1]
            perf_para["val_nvme_bw"] = data[0]
            instance_NVME.delete()

        return perf_para

    def kill_all():
        password = "micron"
        print("Kill Processes")
        for line in os.popen("ps aux | grep start.py"):
            foo = list(filter(None,line.split(" ")))
            foo = foo[1]
            if foo:
                cmd = ("sudo kill -9 "+foo)
                p = subprocess.call('echo {} | sudo -S {}'.format(password, cmd), shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)

        for line in os.popen("ps aux | grep fio"):
            foo = list(filter(None, line.split(" ")))
            foo = foo[1]
            if foo:
                cmd = ("sudo kill -9 " + foo)
                p = subprocess.call('echo {} | sudo -S {}'.format(password, cmd), shell=True,stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
