sudo apt update --fix-missing
sudo DEBIAN_FRONTEND=noninteractive apt install python3-pip -y
pip install --no-cache-dir -r /home/ubuntu/Kolko_krzyzyk1/requirements.txt
screen -d -m python3 /home/ubuntu/Kolko_krzyzyk1/manage.py runserver 0.0.0.0:8000 --noreload
sleep 10
echo "done! :)"
