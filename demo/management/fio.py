import subprocess
import pandas as pd
import sqlite3
import sys
import os
password = "micron"

class myfio():
    def __init__(self):
        print("start " + sys.argv[2] +" "+sys.argv[4])
        self.file_name = sys.argv[1]
        self.device = sys.argv[2]
        self.drive_name = sys.argv[3]
        self.option_number = sys.argv[4]

        self.default = {
            'direct': 1,
            'randrepeat': 0,
            'ioengine': 'libaio',
            'runtime': 30,
            'size': '12G',
            'group_reporting': 1,
            'ramp_time': 2,
            'rw': 'randread',
            'bs': '4k',
            'rwmixread': 100,
            'rwmixwrite': 0,
            'filename': self.drive_name,
            'numjobs': 16,
            'iodepth': 16,
            'loops': 100,
            'write_bw_log': self.file_name,
            'write_iops_log':  self.file_name,
            'write_lat_log': self.file_name,
            'log_avg_msec': 500
        }

        if self.device == "nvme":
            self.default["direct"] = 1

        self.run_fio()

    def run_fio(self):

        if self.option_number == "option1":
            print("option1")
            self.default["rw"] = "randread"
            self.default["bs"] = "4k"
            self.default["rwmixread"] = 100
            self.default["rwmixwrite"] = 0
        elif self.option_number == "option2":
            print("option2")
            self.default["rw"] = "randwrite"
            self.default["bs"] = "4k"
            self.default["rwmixread"] = 0
            self.default["rwmixwrite"] = 100
        elif self.option_number == "option3":
            print("option3")
            self.default["rw"] = "randread"
            self.default["bs"] = "128k"
            self.default["rwmixread"] = 100
            self.default["rwmixwrite"] = 0
        elif self.option_number == "option4":
            print("option4")
            self.default["rw"] = "randwrite"
            self.default["bs"] = "128k"
            self.default["rwmixread"] = 0
            self.default["rwmixwrite"] = 100


        path = os.path.dirname(os.path.realpath(__file__))
        fio_file_name = path+"/my_fio_"+self.device+".fio"
        f = open(fio_file_name,'w')
        start = "[global]\n"
        end = "[finish-test]"
        f.write(start)
        for key, val in self.default.items():
            f.write(""+key+"="+str(val)+"\n")
        f.write(end)
        f.close()

        # Run command
        cmd = "sudo fio "+fio_file_name
        p = subprocess.call('echo {} | sudo -S {}'.format(password, cmd), shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)

        self.write_to_db()

    def write_to_db(self):
        fname = self.file_name.replace('.fio','')
        keep_number = int(self.default["runtime"] / (self.default["log_avg_msec"] / 1000))

        df_bw = pd.read_csv(fname+"_bw.log", header=None, usecols=[0, 1])
        df_bw.columns = ["time","bw"]
        # df_bw = df_bw.sort_values(by="time")
        # df_bw = df_bw.head((keep_number*self.default["numjobs"])-self.default["numjobs"])
        # df_bw = df_bw[1:keep_number]


        df_iops = pd.read_csv(fname+"_iops.log", header=None, usecols=[0, 1])
        df_iops.columns = ["time","iops"]
        # df_iops = df_iops.sort_values(by="time")
        # df_iops = df_iops.head((keep_number*self.default["numjobs"])-self.default["numjobs"])
        # df_iops = df_iops[1:keep_number]


        df_lat = pd.read_csv(fname+"_lat.log", header=None, usecols=[0, 1])
        df_lat.columns = ["time","lat"]
        # df_lat = df_lat.sort_values(by="time")
        # df_lat = df_lat.head((keep_number*self.default["numjobs"])-self.default["numjobs"])
        df_lat = df_lat.drop(["time"], axis=1)
        df_lat = df_lat[0:keep_number]


        # result = pd.concat([df_bw, df_lat, df_iops], axis=1)
        result = pd.concat([df_bw, df_iops], axis=1)
        result = result.drop(["time"],axis=1)

        new_time = []
        counter = 0
        for idx, row in result.iterrows():
            if counter>=keep_number:
                counter=0
            new_time.append(counter)
            counter = counter+1

        result["time"] = new_time
        result = result.groupby(["time"]).sum().reset_index()


        df_lat["time"] = list(range(0,keep_number))


        result = pd.concat([result, df_lat], axis=1)
        result = result.drop(["time"],axis=1)


        # result["bw"] = result["bw"] * 16
        # result["iops"] = result["iops"] * 16


        #Write to DB
        db_path = os.path.dirname(os.path.realpath(__file__)).split("/")
        db_path = db_path[0:len(db_path)-2]
        db_path = "/".join(db_path)
        db_path = db_path+"/db.sqlite3"

        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        for index, row in result.iterrows():
            cursor.execute("insert into demo_"+self.device+" (bw, lat, iops) values (?, ?, ?)",(int(row["bw"]), int(row["lat"]), int(row["iops"])))
        conn.commit()


        print("finished " +self.device)

        #Deleting Old Files
        cmd = "sudo rm "+self.file_name+"*"
        p = subprocess.call('echo {} | sudo -S {}'.format(password, cmd), shell=True, stdout=subprocess.PIPE,stderr=subprocess.STDOUT)

myfio()
