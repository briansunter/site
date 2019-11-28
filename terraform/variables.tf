variable "region" {}
variable "domain" {}
variable "zone_id" {}
variable "certificate_arn" {}

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
