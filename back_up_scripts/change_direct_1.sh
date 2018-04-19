#sed -i '/test3=6/{s/.*/test3=0/}' enmotus_demo/demo/management/fio.py

sed -i '/            "direct": 0/{s/.*/            "direct": 1,/}' enmotus_demo/demo/management/fio.py
