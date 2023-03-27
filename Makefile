.PHONY: help

help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

docker-build: ## Build your images, install dependencies and start the containers
	@docker compose build
	@cd front && yarn
	@docker compose up

docker-start: ## Start your containers
	@docker compose up

docker-clean: ## Clean your containers
	@docker compose -f docker-compose.yaml down --rmi local -v