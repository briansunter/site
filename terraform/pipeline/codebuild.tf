data "template_file" "prod_buildspec" {
  template = file("${path.module}/templates/buildspec.yml")

  vars = {
    app_name          = var.app_name
    stage             = var.git_repository_branch
    bucket_name       = var.bucket_name
    distribution_id  = var.cloudfront_distribution_id
  }
}

resource "aws_codebuild_project" "prod_app_build2" {

  name          = "${var.app_name}-${var.git_repository_branch}-codebuild"
  build_timeout = "80"
  service_role = aws_iam_role.codebuild_role.arn

  artifacts  {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"

    // https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html
    image           = "aws/codebuild/standard:5.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true
  }

  source {
    type      = "GITHUB"
    location        = "https://github.com/${var.git_repository_owner}/${var.git_repository_name}.git"
    buildspec = data.template_file.prod_buildspec.rendered
  }

  cache {
    type  = "S3"
    modes = ["LOCAL_DOCKER_LAYER_CACHE", "LOCAL_SOURCE_CACHE", "LOCAL_CUSTOM_CACHE"]
    location = "${aws_s3_bucket.source.id}/build-cache"
  }
}

resource "aws_s3_bucket" "source" {
  bucket        = "${var.app_name}-${var.git_repository_branch}-pipeline"
  force_destroy = true
}

resource "aws_codebuild_webhook" "master_push" {
  project_name =  "${var.app_name}-${var.git_repository_branch}-codebuild"
  build_type   = "BUILD"
  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PUSH"
    }

    filter {
      type    = "HEAD_REF"
      pattern = "master"
    }
  }
}
