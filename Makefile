build:
	npm run build

dev:
	npm run dev

deploy-production-infra:
	cd terraform; terraform apply -auto-approve -var-file="production.tfvars"
