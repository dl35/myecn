
IMAGE=angular-cli-docker:7.0.5
NAME=ng-7.0.5

run: ## Run container on port configured in `config.env`
	docker run -it --rm --network="host"  -p 4200:4200  -v $(CURDIR)/../private:/app  --name="$(NAME)" $(IMAGE)



dev: ## Run container on port configured in `config.env`
	docker exec -it $(NAME) /bin/sh


build:
	docker build --rm -f Dockerfile  -t $(IMAGE) .

stop:
	docker stop $(NAME)