resource "aws_codepipeline" "prod_pipeline" {
  name     = "${var.app_name}-${var.git_repository_branch}-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.source.bucket
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source"]

      configuration = {
        Owner  = var.git_repository_owner
        Repo   = var.git_repository_name
        Branch = var.git_repository_branch
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["source"]

      configuration = {
        ProjectName = "${var.app_name}-${var.git_repository_branch}-codebuild"
      }
    }
  }
}
locals {
  webhook_secret = "super-secret"
}

resource "aws_codepipeline_webhook" "pr_webhook" {
  name            = "webhook-github-pr"
  authentication  = "GITHUB_HMAC"
  target_action   = "Source"
  target_pipeline = aws_codepipeline.prod_pipeline.name

  authentication_configuration {
    secret_token = local.webhook_secret
  }

  filter {
    json_path    = "$.ref"
    match_equals = "refs/heads/{Branch}"
  }
}

resource "github_repository_webhook" "pr_webhook" {
  repository = var.git_repository_name

  configuration {
    url          = aws_codepipeline_webhook.pr_webhook.url
    content_type = "json"
    insecure_ssl = true
    secret       = local.webhook_secret
  }

  events = ["push"]
}
