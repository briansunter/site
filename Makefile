build:
	npm run build

deploy-production-infra:
	cd terraform; terraform apply -auto-approve -var-file="production.tfvars"
