variable "app_name" {
  description = "Website project name"
}

variable "git_repository_owner" {
  description = "Github Repository Owner"
}

variable "git_repository_name" {
  description = "Project name on Github"
}

variable "git_repository_branch" {
  description = "Github Project Branch"
}

variable "cloudfront_distribution_id" {
  description = "id of your cloudfront distribution"
}

variable "bucket_name" {
  description = "Name of your deploy bucket"
}

variable "region" {}
