
#IMAGE=angular-cli-docker:7.0.5
IMAGE=angular/dev:7.0.6-5

NAME=ng-7.0.6
USER_ID=`id -u $(USER)`
HOTE=137.129.109.53


run: ## Run container on port configured in `config.env`--network="host" --name="$(NAME)"
	docker run -e UID=$(USER_ID) --hostname="my-ecn" -it --rm -p 4200:4200 -v $(CURDIR)/../private:/src $(IMAGE)



dev: ## Run container on port configured in `config.env`
	docker exec -it $(NAME) /bin/sh


build:
	docker build --rm -f Dockerfile  -t $(IMAGE) .

stop:
	docker stop $(NAME)

list: 
	docker images 

manu:
	
	docker run -e USER_ID=$(USER_ID) -e HOTE=$(HOTE) \
		--interactive --tty --rm \
		--volume $(CURDIR)/../private:/src \
		--publish 4200:4200 \
		dev/angular:7.0.5-3

run2:
	docker run -e USER_ID=$(USER_ID) -e HOTE=$(HOTE) -it --rm   -p 4200:4200 -v $(CURDIR)/../private:/src  $(IMAGE)
