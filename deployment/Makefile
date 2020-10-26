services:
	chmod +x ./services/*
	sudo cp ./services/* /etc/systemd/system/
	sudo systemctl enable api
	sudo systemctl enable web

.PHONY: services clean