build:
	npm run build

deploy-staging-infra:
	cd terraform; terraform apply -auto-approve -var-file="staging.tfvars"
