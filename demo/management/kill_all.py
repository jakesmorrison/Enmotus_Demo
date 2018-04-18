import subprocess
import pandas as pd

password = "micron"

def kill_all():
    data = subprocess.check_output("ps -aux | grep demo", shell=True)
    data = data.decode("utf-8")
    data = data.split("\n")
    data = [x.split() for x in data]

    for x in data:
        try:
            cmd = "sudo kill -9 "+str(x[1])
            p = subprocess.call('echo {} | sudo -S {}'.format(password, cmd), shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
            print("killed "+str(x[1]))
        except:
            print("empty arr")

kill_all()