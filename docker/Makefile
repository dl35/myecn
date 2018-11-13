
IMAGE=angular-cli-docker:7.0.5
NAME=ng-7.0.5
USER_ID=`id -u $(USER)`
HOTE=137.129.109.53

run: ## Run container on port configured in `config.env`--network="host"
	docker run -it --rm   -p 4200:4200  -v $(CURDIR)/../private:/app  --name="$(NAME)" $(IMAGE)



dev: ## Run container on port configured in `config.env`
	docker exec -it $(NAME) /bin/sh


build:
	docker build --rm -f Dockerfile  -t $(IMAGE) .

stop:
	docker stop $(NAME)


manu:
	
	docker run -e USER_ID=$(USER_ID) -e HOTE=$(HOTE) \
		--interactive --tty --rm \
		--volume $(CURDIR)/../private:/app \
		--publish 4200:4200 \
		meteo/angular:7.0.5-2