# https://github.com/sjkaliski/terraform-static-site/blob/master/main.tf

resource "aws_acm_certificate" "cert" {
  domain_name       = "*.${var.domain}"
  validation_method = "DNS"
  subject_alternative_names = [var.domain]
}

resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
      ttl     = 60
    }
  }
  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id = var.zone_id
}

resource "aws_s3_bucket" "root" {
  bucket = var.domain
}

resource "aws_s3_bucket_website_configuration" "root_website" {
  bucket = aws_s3_bucket.root.bucket

  index_document {
    suffix = "index.html"
  }

}

resource "aws_s3_bucket_policy" "root" {
  bucket = aws_s3_bucket.root.id
  policy = data.aws_iam_policy_document.root.json
}

data "aws_iam_policy_document" "root" {
  statement  {
    sid = "PublicRead"

    actions = [
      "s3:GetObject",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      "${aws_s3_bucket.root.arn}/*",
    ]
  }
}

resource "aws_cloudfront_distribution" "root_distribution" {
  origin {
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    domain_name = aws_s3_bucket.root.website_endpoint
    origin_id   = var.domain
  }

  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_100"

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.domain
    min_ttl                = 0
    default_ttl            = 60
    max_ttl                = 31536000

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern     = "index.html"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = var.domain

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  aliases = [var.domain]
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    ssl_support_method  = "sni-only"
  }
}

resource "aws_route53_record" "root" {
  zone_id = var.zone_id

  name = var.domain
  type = "A"

  alias  {
    name                   = aws_cloudfront_distribution.root_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.root_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
resource "aws_s3_bucket" "www" {
  bucket = "www.${var.domain}"
}

resource "aws_s3_bucket_website_configuration" "www_website" {
  bucket = aws_s3_bucket.www.bucket
    redirect_all_requests_to {
      host_name = "https://${var.domain}"

    } 

}

resource "aws_s3_bucket_policy" "www" {
  bucket = aws_s3_bucket.www.id
  policy = data.aws_iam_policy_document.www.json
}

data "aws_iam_policy_document" "www" {
  statement  {
    sid = "PublicRead"

    actions = [
      "s3:GetObject",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      "${aws_s3_bucket.www.arn}/*",
    ]
  }
}

resource "aws_cloudfront_distribution" "www_distribution" {
  origin {
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    domain_name = aws_s3_bucket.www.website_endpoint
    origin_id   = "www.${var.domain}"
  }

  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_100"

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "www.${var.domain}"
    min_ttl                = 0
    default_ttl            = 60
    max_ttl                = 31536000

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }
  aliases = ["www.${var.domain}"]
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.cert.arn
    minimum_protocol_version = "TLSv1.1_2016"
    ssl_support_method       = "sni-only"
  }
}

resource "aws_route53_record" "www" {
  zone_id = var.zone_id
  name    = "www.${var.domain}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.www_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.root_distribution.id
}

output "bucket_name" {
  value = aws_s3_bucket.root.bucket
}
