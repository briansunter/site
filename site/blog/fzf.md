---
title: fzf - a terminal fuzzy finder
date: 2019-12-19
code_lang: bash
code_excerpt: |

tags:
  - blog
  - emacs
  - programming

---

fzf is a terminal fuzzy finder tool that integrates nicely with many tools. These are a few of my favorite features.

# Getting started
Install with hombrew and source completions in `.zshrc`

`brew install fzf`

`$(brew --prefix)/opt/fzf/install`

# Shell History Search
Type `CTRL-R` to search your shell history for previously used commands

![fzf history search](/images/blog/fzf-history.gif "fzf history search")

# Interactive cd
Just type `cd` enter without arguments to enter "interactive cd". Each folder tree is searchable.


![fzf interactive cd](/images/blog/int-cd.gif "interactive cd")
