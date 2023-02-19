### Makefile for install of develepment environment
#
# install command
# > make install
# ==========================================
# common
# ==========================================
.PHONY: install
install:
	sudo docker-compose build api

npm:
	sudo docker-compose exec api yarn

dev:
	sudo docker-compose exec api yarn start:dev 

start:
	sudo docker-compose exec api yarn start

stop:
	sudo killall node

permission:
	sudo chown ubuntu:ubuntu -R nestjs
	
# ==========================================
# front
# ==========================================
front:
	yarn workspace front dev:ssl

front-http:
	yarn workspace front dev
# ==========================================
# nestjs/prisma
# ==========================================

api:
	yarn workspace api nest start --debug --watch

api-build:
	rm -rf packages/api/dist
	yarn workspace api build

db:
	docker-compose up -d db
	npx cross-env BROWSER=none yarn workspace api prisma studio

db-down:
	docker-compose down

prisma:
	@make schema
	@make types
	@make migrate

schema:
	yarn workspace api prisma-merge --baseFile prisma/base.prisma --schemaFilePatterns 'prisma/*/*.prisma' --outputFile prisma/schema.prisma
	yarn prisma generate

types:
	yarn graphql-code-generator --config graphql-codegen.yml

migrate: 
	yarn prisma migrate dev --name diff --create-only --preview-feature
	yarn prisma migrate deploy --preview-feature

db-reset:
	yarn prisma db push --accept-data-loss --schema=./packages/api/prisma/reset.prisma
	yarn prisma db push --accept-data-loss 

# ==========================================
# web3
# ==========================================
chain-%:
	@sed -i -e 's/CHAIN.*/CHAIN=${@:chain-%=%}/g' .env

web3:
	yarn workspace web3 start

compile:
	yarn workspace web3 compile

contract-%:
	yarn workspace web3 hardhat deploy --name ${@:contract-%=%}

token-%:
	yarn workspace web3 hardhat deploy --type token --name ${@:token-%=%}

gas:
	yarn workspace web3 hardhat gasPrice

swap-%:
	yarn workspace web3 hardhat swap --name ${@:swap-%=%}

test:
	yarn workspace web3 vitest packages/web3

test-%:
	yarn workspace web3 vitest packages/web3/test/${@:test-%=%}

# ==========================================
# local
# ==========================================
upload:
	@scp * nfs:/api

	