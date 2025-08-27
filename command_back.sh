sudo apt update --fix-missing
sudo DEBIAN_FRONTEND=noninteractive apt install python3-pip -y
sudo DEBIAN_FRONTEND=noninteractive apt-get install python3-dev default-libmysqlclient-dev build-essential pkg-config -y
pip install mysqlclient
pip install --no-cache-dir -r /home/ubuntu/Kolko_krzyzyk_back1/requirements.txt
screen -d -m python3 /home/ubuntu/Kolko_krzyzyk_back1/manage.py runserver 0.0.0.0:8080 --noreload
sleep 10
echo "done! :)"
