from django.shortcuts import render
from django.http import JsonResponse
import json
from .management import methods
import os

counter = 0

# Create your views here.
def demo_dashboard(request):
    context={
    }
    return render(request,"demo/demo_dashboard2.html",context)

def get_data(request):
    global counter
    counter = counter+1
    data = methods.Methods.retrieve_data()

    context={
        'nvdimm_iops': [counter, int(data['val_nvdimm_iops'])],
        'nvme_iops': [counter, data['val_nvme_iops']],
        'nvdimm_lat': data['val_nvdimm_lat'],
        'nvme_lat': data['val_nvme_lat'],
        'nvdimm_bw': ("%.2f" % ((int(data['val_nvdimm_bw']/1000000)))),
        'nvme_bw': ("%.2f" % (data['val_nvme_bw']/1000000)),
    }
    return JsonResponse(json.loads(json.dumps(context)))

def new_fio(request):
    params = request.GET
    foo = params["fio"]
    methods.Methods.kill_all()

    path = os.path.dirname(os.path.realpath(__file__))
    cmd = "python " + path + "/management/start.py "+foo+" &"
    os.system(cmd)

    context={}
    return JsonResponse(json.loads(json.dumps(context)))

def stop_demo(request):
    print("Stop")
    methods.Methods.kill_all()
    context={}
    return JsonResponse(json.loads(json.dumps(context)))
