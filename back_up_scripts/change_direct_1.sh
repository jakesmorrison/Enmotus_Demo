#sed -i '/test3=6/{s/.*/test3=0/}' conference_demo/demo/management/fio.py

sed -i '/            "direct": 0/{s/.*/            "direct": 1,/}' conference_demo/demo/management/fio.py
