#!/bin/sh

python /home/micron/enmotus_demo/demo/management/kill_all.py

sudo ecmd --delete_all
sudo ecmd --pagesize 128k

sudo ecmd --create vdrive /dev/pmem0 /dev/pmem1 /dev/pmem2 /dev/pmem3 /dev/pmem4 /dev/pmem5 /dev/pmem6 /dev/pmem7 /dev/pmem8 /dev/pmem9 /dev/pmem10 /dev/pmem11 stripe

sudo ecmd --create vdrive /dev/nvme0n1
sudo ecmd --create vdrive0 vdrive1
sudo ecmd --stats off t=0 

python /home/micron/enmotus_demo/manage.py runserver
