---
title: App Version
date: 2019-06-25
featured_image: /images/blog/spacemacs/writeroom.png
image_caption: Photo by Dylan Gillis on Unsplash
excerpt: How should you version end user apps and APIs?
tags:
    - blog
    - business
---
# How should you version apps and APIs?
> We're used to using semver to manage our dependencies,
but when it comes time to deploy our app or API, is semver the right choice for versioning?

# What is semver?
Semver is a convention for versioning software. Basically, the idea is:

> Given a version number MAJOR.MINOR.PATCH, increment the: <br/> <br/>
> **MAJOR** version when you make incompatible API changes, <br/> <br />
> **MINOR** version when you add functionality in a backwards-compatible manner, and <br/> <br/>
> **PATCH** version when you make backwards-compatible bug fixes.

The most important feature of semver is communicating breakage. It would be better if we could [design software in such a way that we never break previous functionality](https://www.youtube.com/watch?v=oyLBGkS5ICk "Rich Hickey spec-u-lation talk"), but this still sometimes happens. If I want to upgrade the major version of one of my code dependencies, I know that I may need to makes changes to the way I consume an API or that prior functionality may be missing. There are different conventions on how to handle minor and patch updates, but the main purpose for these is the ability to revert to an earlier known working version if a bug is accidentally introduced by the library author.

# Versioning Apps and APIs
The versioning needs of apps and APIs are usually different than those of code libraries. We may want to have a version in a build artifact repository or in a log message. However, semver's main purpose of communicating breakage doesn't apply here. Breakage may mean different things depending on the context. What would breakage mean for a user interface? In the case of a network API, we try to never break an API. Breakage must be communicated in a different way, like a deprecation warning and a migration plan. If we deploy every commit, do we need to manually increment the version every PR? If we don't need semver's method of communicating breakage, what should we use?

## What do we need from a version number?
Let's consider a common use case of writing a version number to a log file to debug unexpected issues. We may have a mobile app deployed with different version numbers running in the wild and want to know if a new version is causing problems. We might deploy a new version of a network API and want to see if there is an error spike. In these cases I usually want to know three things, what code is currently running, when the code was pushed, and tie this back to the build job that pushed the code.

### Identifying the code
Git short hash will give you a 7 digit abbreviated commit hash by default. This has a 1% chance of collision after 2300 commits if used alone, but we don't want the version number to be excessively large and we will use it in conjunction with something else.
``` bash
git rev-parse --short HEAD
4177d17
```

### Identifying the CI run and when the code was pushed
Who pushed this code and when? How would we find the build logs from the CI run? How do we look at the build environment state at the time of the build? How do we look at who authorized the build to go out?

I think a POSIX timestamp, a time integer accurate down to the second, would be sufficient in most real world use cases. It would allow you to easily correlate it with the build history. It also has the useful property that it should be unique for each run. If your build system guarantee monotonically increasing build numbers you could use those instead. These both have useful properties that they gaurunteed ordering and uniqueness.

A POSIX timestamp is 10 digits and is unlikely to conflict.
``` bash
1540600069
```

With the git hash
``` bash
4177d17-1540600069
```

## Human readable meta-data
Sometimes we may want additional meta-data. We may still be deploying multiple commits and want to have a release number. We may have other milestones we want to track in the version number. I suggest using an integer number, manually incremented by a human in code. If your package manager has a semver version, you can use the major version. This version number can be incremented as needed and tied to release notes.

``` bash
4177d17-1540600069-42
```

## (Git Short Hash)-(POSIX Timestamp)-(Version)
In conclusion, I think the combination of git short hash, POSIX timestamp, and human version is suitable for versioning of Apps and APIs in a continuous integration environment.
