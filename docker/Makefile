


run: ## Run container on port configured in `config.env`
	docker run -it --rm --network="host"  -p 4200:4200  -v $(CURDIR)/../private:/app  --name="ng-7.0.4" angular-cli-docker:7.0.4



dev: ## Run container on port configured in `config.env`
	docker exec -it ng-7.0.4 /bin/sh


build:
	docker build --rm -f Dockerfile  -t angular-cli-docker:7.0.4 .

stop:
	docker stop ng-7.0.4