data "template_file" "dev_buildspec" {
  template = file("${path.module}/templates/buildspec.yml")

  vars = {
    app_name          = var.app_name
    stage             = var.git_repository_branch
    bucket_name       = var.bucket_dev_name
    distribution_id  = var.cloudfront_distribution_dev_id
  }
}

resource "aws_codebuild_project" "dev_app_build" {

  name          = "${var.app_name}-dev-codebuild"
  build_timeout = "80"
  service_role = aws_iam_role.codebuild_role.arn

  artifacts  {
    type = "NO_ARTIFACTS"
  }

  environment {
    compute_type = "BUILD_GENERAL1_LARGE"

    // https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html
    image           = "aws/codebuild/standard:5.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true
  }

  source {
    type      = "GITHUB"
    location        = "https://github.com/${var.git_repository_owner}/${var.git_repository_name}.git"
    buildspec = data.template_file.dev_buildspec.rendered
  }

  cache {
    type  = "S3"
    modes = ["LOCAL_DOCKER_LAYER_CACHE", "LOCAL_SOURCE_CACHE", "LOCAL_CUSTOM_CACHE"]
    location = "${aws_s3_bucket.source_dev.id}/build-cache"
  }
}

resource "aws_s3_bucket" "source_dev" {
  bucket        = "${var.app_name}-dev-pipeline"
  force_destroy = true
}

resource "aws_codebuild_webhook" "dev_push" {
  project_name =  "${var.app_name}-dev-codebuild"
  build_type   = "BUILD"
  filter_group {
    filter {
      type    = "EVENT"
      pattern = "PUSH"
    }

    filter {
      type    = "HEAD_REF"
      pattern = "master"
      exclude_matched_pattern = true
    }
  }
}
