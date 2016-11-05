# check-host
Container de uma aplicação web que retorna um objeto JSON informando o status da máquina hospedeira

`docker run -d
	--hostname=$(hostname)
	--volume /var:/var
	--volume /dev:/dev
	--publish 8080:8080
	--privileged
	victorhundo/check-host`
