include .env

.PHONY: up

up:
	docker-compose up -d

.PHONY: down

down: 
	docker-compode down

.PHONY: logs

logs:
	docker-compose logs -f