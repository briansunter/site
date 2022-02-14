---
title: Python Setup 2022
date: 2022-02-13
featured_image: ''
image_caption: 'how to set up python'
excerpt: Best way to set up python
tags:
    - blog
    - programming
    - python
    - devops
---

# Managing python projects in 2022

There are lots of different options for managing python projects and dependencies.
Overall, I recommend using `pyenv` + `poetry`. I will describe why we need these tools, how they work, and some of the alternatives.

There are three main things to think about when managing a python project:

- How to manage the python version
- How to download python dependencies, like django
- How to manage python projects, like initialization and publishing packages.

# Tools Overview

- **Homebrew** installs development tools on macos. Follow the instructions here to set it up if you haven't already https://brew.sh/

- **pyenv** lets you easily install the exact python version you want switch between different versions of Python if a project needs it.

- **poetry** helps us download python dependencies and has tools to manage python projects, such as publishing packages.

# Initial Setup 

## Set up pyenv
- Install pyenv using homebrew
  `brew install pyenv`
- Install python 3.9
  `pyenv install 3.9.0`
- Use python 3.9 globally
  `pyenv global 3.9.0`

Now we will be using python 3.9 in our terminal by default. If we work with a project that needs a specific version of python, pyenv can be configured to different version for that project.

## Install poetry
- `pip3 install poetry`

This will install poetry globally. You may need to install this again if you change python versions using `pyenv`

# Django Project Setup Example
Let's start by setting up a new django project using poetry

- First let's make the folder where we want the project to live
     `mkdir example`
     `cd example`
- Now lets initialize the python project using poetry.
     `poetry init`

## pyproject.toml
It should create a file called pyproject.toml to configure our project and define our dependencies.

``` yaml
[tool.poetry]
name = "example"
version = "1.0.0"
description = "sample project"
authors = ["John Smith <john@example.com>"]
license = "MIT"

[tool.poetry.dependencies]
python = "^3.9"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

## poetry.lock
It also creates a `poetry.lock` file, which specifies the exact version of every dependency to install. This ensures every build with the same poetry.lock installs exactly the same dependencies. You want the app you deploy to have the exact same versions you already tested.

Poetry adds the carat pinning "`^4.0.2"` to allow for backwards compatible updates. This `^` syntax means any version of django 4.*.* is allowed. If we want to upgrade django later on, we can run `poetry update` which will install the latest version of django 4.*.* and update the poetry.lock file to specify the new exact version.

Behind the scenes, it uses a tool built into python called `virtualenv` which isolates the dependencies to the project you're working on. This allows you to use different versions of django in different projects.

# Initialize django project
Django includes some command line tools for generating projects like `django-admin`. You'll see these if you follow any django tutorials.

Since we've installed django at the project level using poetry, we need to open a poetry shell to have access to these commands.

- Run `poetry shell`
  It should open a new shell which has access to the django commands.
  Now, you can use the django commands to generate your site
- Run `django-admin startproject mysite` to create your project skeleton
- Run `python mysite/manage.py runserver` to start your local server