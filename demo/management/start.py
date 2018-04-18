import subprocess
import sqlite3
import os
import sys
from django.conf import settings
password = "micron"

def start_app(option_number):
    print("Remove Data Files")
    print("----------------------------")
    cmd = "sudo rm enmotus*"
    p = subprocess.call('echo {} | sudo -S {}'.format(password, cmd), shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
    cmd = "sudo rm my_fio_*"
    p = subprocess.call('echo {} | sudo -S {}'.format(password, cmd), shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)

    print("Clear DB")
    print("----------------------------")
    db_path = "/home/micron/conference_demo/db.sqlite3"
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    table_names=["nvdimm","nvme"]
    for x in table_names:
        cursor.execute("DELETE FROM demo_"+x)
    conn.commit()

    print("Start FIO")
    print("----------------------------")
    path = os.path.dirname(os.path.realpath(__file__))
    # cmd = "source activate micron_apps"
    # p = subprocess.call(cmd, shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
    print("Start NVDIMM Test")
    print("----------------------------")
    cmd = "python "+path+"/fio.py enmotus_eba nvdimm /dev/eba "+option_number+" &"
    os.system(cmd)
    print("Start NVME Test")
    print("----------------------------")
    cmd = "python "+path+"/fio.py enmotus_nvme nvme /dev/nvme0n1 "+option_number
    os.system(cmd)

    print("Open Browser")
    print("----------------------------")

    print("Start FIO Loop")
    print("----------------------------")


    c=1
    while True:
        print(c)
        c=c+1
        cmd = "python "+path+"/fio.py enmotus_eba nvdimm /dev/eba "+option_number+" "
        os.system(cmd)
        kill_my_fio("my_fio_nvdimm.fio")
        cmd = "python "+path+"/fio.py enmotus_nvme nvme /dev/nvme0n1 "+option_number
        os.system(cmd)
        kill_my_fio("my_fio_nvme.fio")

def kill_my_fio(name):
    data = subprocess.check_output("ps -aux | grep "+name, shell=True)
    data = data.decode("utf-8")
    data = data.split("\n")
    data = [x.split() for x in data]

    for x in data:
        try:
            cmd = "sudo kill -9 "+str(x[1])
            p = subprocess.call('echo {} | sudo -S {}'.format(password, cmd), shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
        except:
            print("finished kill")

start_app(sys.argv[1])
