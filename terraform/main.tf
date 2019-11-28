terraform {
  backend "s3" {
    encrypt = true
    bucket = "brian-terraform-state"
    region = "us-east-1"
    key = "terraform/personal-site"
  }
}

module "site" {
  source = "./site"
  region = var.region
  domain = var.domain
  zone_id = var.zone_id
  certificate_arn = var.certificate_arn
}

module "pipeline" {
  source = "./pipeline"
  region = var.region
  bucket_name = module.site.bucket_name
  cloudfront_distribution_id = module.site.cloudfront_distribution_id
  app_name = var.app_name
  git_repository_owner = var.git_repository_owner
  git_repository_name = var.git_repository_name
  git_repository_branch = var.git_repository_branch
}
