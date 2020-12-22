---
title: Replacing sass with PostCSS
date: 2019-12-28
layout: post
tags:
  - blog
  - programming
  - frontend
  - css

code_lang: js
code_excerpt: |
  :root {
      --some-color: red;
  }
  .foo {
        /*red */
        color: var(--some-color);
  }
---

[PostCSS](https://postcss.org/ "PostCSS Tool") has all the features I need from [sass](https://sass-lang.com/ "Sass design language") for managing CSS. At this point sass feels like [CoffeeScript](https://coffeescript.org/ "Coffee Script Language") and PostCSS feels like [Babel](https://babeljs.io/ "Babel JavaScript Compiler").

I recently quickly and easily replaced the sass for this site with PostCSS plug-ins. I never liked sass because it was Ruby based and it was a full language that is non extensible. PostCSS allows you to write CSS extensions in JavaScript and only import the functionality you need. I've replaced all the features I liked from sass with PostCSS plug-ins. 


# Variables and Custom Properties
Custom properties can do everything preprocessor variables can do and more. They are override-able and inspectible by the Chrome dev tools.

``` css
:root {
    --some-color: red;
}

.foo {
    /* red */
    color: var(--some-color);
}
```

# Nesting
There is a [plug-in](https://github.com/postcss/postcss-nested "PostCSS nested plug-in") for sass style nesting.

``` css
.article-card {
    .featured-image-link {
        &:hover {
            .featured-image {
                transform: scale(1.1);
            }
        }
    }
    .featured-image {
        transition: transform 1.5s ease;
    }
}
```

# Imports

The [PostCSS Imports Plug-in](https://github.com/postcss/postcss-import "PostCSS Imports Plug-in") allows for code reuse and modularization.

``` css
@import "modules/_links.css";
@import "modules/_typography.css";
@import "modules/_article-card.css";
@import "modules/_typography.css";
```

# Browser Support

The [Autoprefixr Plug-in](https://github.com/postcss/autoprefixer "Autoprefixr Plug-in") helps you automatically support additional browsers. 


# Special Plug-ins - TailwindCSS

The [Tailwind CSS Framework](https://tailwindcss.com/docs/using-with-preprocessors "Tailwind CSS Framework") includes a PostCSS Plug-in.
This plug-in adds some additional keywords like (like `@tailwind`, `@apply`, `theme()` that make theming easier. It also generates a theme based on your configuration file.

``` js
  tailwindcss('./tailwind.config.js')
```
