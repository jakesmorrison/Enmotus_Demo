#sed -i '/'direct': 1,/{s/.*/'direct': 0,/}' enmotus_demo/demo/management/fio.py

sed -i '/            "direct": 1/{s/.*/            "direct": 0,/}' enmotus_demo/demo/management/fio.py

