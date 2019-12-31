---
title: Better npm global install
date: 2019-12-29
layout: post
tags:
  - blog
  - programming
  - javascript

---

A better way to manage global npm command line tools.

I've always disked running `npm install -g create-react-app`to have a command line tool. I also dislike `npx create-react-app` because it downloads the dependencies every time. I can't keep track of it or lock down the version easily. Instead I have a project in my dotfiles which I add to my path.

In my `~/.dotfiles` directory I have a `node` folder with a `package.json`. Whenever I need a tool I install it to this project.

In my `~/.zshrc` I add `~/.dotfiles/node/node_modules/.bin` to my `$PATH`.

``` bash
export PATH="$HOME/.dotfiles/node/node_modules/.bin:$PATH"
```

Now I can access these npm command line tools and keep them versioned.
