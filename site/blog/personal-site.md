---
title: Personal Site
date: 2019-11-29
featured_image: /images/blog/11ty.png
image_caption: Eleventy static site generator
excerpt: Eleventy
tags:
    - blog
    - programming
    - frontend
---

I've rewritten my personal site using [Eleventy](https://www.11ty.io/ "Eleventy"), a Javascript static site generator and am hosting it on Cloudfront configured by terraform.

## What is a Static Site Generator?
Static sites are a way to make web pages by generating html from content files like markdown.
Static sites are different that content management systems (CMS) like [Wordpress](https://wordpress.com/ "Wordpress"), which needs a dedicated server and database to render pages when users visit the url. Static sites are much simpler, because they render all the pages ahead of time and cache this static content. This allows them to be hosted much more simply, cheaply, and reliably. One potential downside of static sites is you need to write content in a language like markdown instead of using a GUI editor, but the GUI tools for writing markdown are improving.

## Eleventy
I've tried a number of static site generators but [Eleventy](https://www.11ty.io/ "Eleventy") is the simplest, most convenient, and most configurable solution I've found. It has some unique features, like being able to mix different template languages in layouts and create pages from data files like json.

I've tried a number of other static site generators like Jekyll, Hugo, perun, and Hakyll but all were either not customizable enough or didn't have a good enough build system. I use gulp to optimize the assets, which has many plugins for handling things like images.

Eleventy works like other static sites, where you have a folder of markdown files with yaml metadata at the top and a folder of templates, and your markdown is rendered as html inside the templates.

### Markdown Blog Post
``` markdown
---
layout: blog
title: first post
---

# This is a Title
This is an example post.

```
### Blog Post layout
``` html
---
layout: layouts/base.njk
---
{% raw %}
<h1>{{ title }}</h1>
{{ content | safe }}
<p><a href="{{ '/' | url }}">← Home</a></p>
{% endraw %}
```

### Folder Structure
``` bash/1,10
├── blog
│   └── firstpost.md
├── package-lock.json
├── package.json
├── src
│   ├── _data
│   │   └── siteData.json
│   ├── _includes
│   │   └── layouts
│   │       ├── base.njk
│   │       └── blog.njk
│   ├── images
│   │   └── placeholder.gif
│   ├── index.njk
│   ├── scripts
│   │   ├── index.js
│   │   └── modules
│   │       └── list.js
│   └── styles
│       ├── _reset.scss
│       └── index.scss
└── webpack.config.js
```

## Tailwind CSS
[Tailwind CSS](https://tailwindcss.com/ "Tailwind CSS") is a CSS framework similar to[Bootstrap](https://getbootstrap.com "Bootstrap") but slightly lower level. For example, Tailwind CSS doesn't include premade buttons, but the buttons are easy to create by decorating the html with classes.

A side effect of these css frameworks is the html can get bloated, but this isn't a big problem if you're using components and templates. You can accomplish a lot while writing very little CSS. It also makes CSS conflicts on deeply nested components less likely.

``` html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>

You can still extract this out to css with `@apply`

``` html
<button class="btn-blue">
  Button
</button>

<style>
.btn-blue {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
```

## PurgeCSS
PurgeCSS looks at your html files and removes all unused CSS. Tailwind is usually `58kb` minified and gziped but PurgeCSS compresses it down to the `2.9`kb subset I'm actually using on my website.

# Cloudfront, S3, and build pipeline
I've completely specified the cloud hosting and deploy pipeline using terraform. The terraform configuration can deploy the following with a small config file with your app name, desired domain or subdomain, and github repo name:

* S3 Bucket for storing assets
* Cloudfront CDN with https and `www.` redirection
* Provision SSL for domain or subdomain
* AWS CodeBuild and CodePipeline for deploy on commit

``` hcl
region = "us-east-1"
domain = "briansunter.com"
zone_id = "Z26YPOHMFFRJP4"
app_name = "personal-site"
git_repository_owner = "briansunter"
git_repository_name = "site"
git_repository_branch = "master"
```
![AWS Code Pipeline](/images/blog/codepipeline.png "AWS Code Pipeline")
With this setup my site deploys and is live within 2 minutes of pushing a commit.
