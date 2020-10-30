services:
	chmod +x ./services/*
	sudo cp ./services/* /etc/systemd/system/
	sudo systemctl enable api
	#sudo systemctl enable web #disabled since we didn't get it to work

.PHONY: services clean