---
title: Dotfiles
date: 2019-06-25
excerpt: How I manage my dotfiles on a new machine
code_lang: bash
code_excerpt: |
  /Users/bsunter/.dotfiles
  ├── .gitmodules
  ├── Brewfile
  ├── README.md
  ├── emacs
  │   ├── .emacs.d
  │   └── .spacemacs
  ├── git
  │   └── .gitconfig
  ├── iterm
  │   └── ItermProfile.json
  ├── macos
  │   └── bootstrap.sh
  ├── manage.sh
  ├── vim
  │   └── .vimrc
  └── zsh
  	├── .stow-local-ignore
  	├── .zshrc
  	└── lib

tags:
    - blog
    - programming
---

# What are dotfiles?
There are a number of important programs like your terminal, emacs, and vim which are configured by files starting with a dot (`.zshrc`) in your home directory.

# How to manage dotfiles
Instead of editing your dotfiles in your home directory, I recommend creating a git repo and symlinking the files into your home directory. I create a `.dotfiles` folder in my home directory and use GNU `stow` to symlink the files in my home directory.

# GNU `stow`
GNU stow is strictly a symlink manager. It has a folder structure convention that allows you to create symlinks in the folder above it. If I run `stow` it will create symlinks in the directory above where `stow` was run. There are other tools that do more complicated things, but this works for me and is simple to understand.

``` bash
/Users/bsunter/.dotfiles
├── .gitmodules
├── Brewfile
├── README.md
├── emacs
│   ├── .emacs.d
│   └── .spacemacs
├── git
│   └── .gitconfig
├── iterm
│   └── ItermProfile.json
├── macos
│   └── bootstrap.sh
├── manage.sh
├── vim
│   └── .vimrc
└── zsh
    ├── .stow-local-ignore
    ├── .zshrc
    └── lib
```

# Getting the dotfiles
To start using my dotfiles, you just need to run a few commands.

``` bash
git clone --recursive git@github.com:briansunter/dotfiles.git ~/.dotfiles
```

`cd ~/.dotfiles`

`./manage.sh bootstrap`

This will setup the dotfiles, install brew, and the apps from the brewfile.
[My Dotfiles Github Repo](https://github.com/briansunter/dotfiles "Dotfiles github repo")
