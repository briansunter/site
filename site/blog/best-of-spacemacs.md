---
title: Best of Spacemacs
date: 2019-06-25
featured_image: /images/blog/spacemacs/writeroom.png
image_caption: Photo by Dylan Gillis on Unsplash
excerpt: These are some of my favorite spacemacs features
tags:
    - blog
    - programming
    - emacs
---
# Why Spacemacs

> Spacemacs is an opinionated emacs configuration that supports vim keybindings. It has excellent keybindings, plugins, and a declarative configuration. I use spacemacs like a keyboard only IDE.

# Hierarchical, searchable, discoverable, keybindings
The most unique idea in spacemacs is the keybinding system. When you hit the spacebar, a window pops up at the bottom of the screen to show you "sub commands". These are high level categories at the top level and it shows you options such as `p project`, `w window`, `s search`, and `f files`. If you press another key, such as `w` for window, you are shown another set of commands related to window such as vertical and horizontal split. If you type these commands slowly, you can see prompts of all possible commands, but you can also type them quickly, like `SPC w v` for vertical window split. It's easy to manage a large number of keybindings without conflict with with method. You can also type `SPC SPC` to search for keybindings.

## Top Level Commands `SPC`
![All Spacemacs Commands](/images/blog/spacemacs/bottom-buffer.png "Top Level Commands")
## Markdown Commands `SPC-m`

![Markdown Commands](/images/blog/spacemacs/markdown-all.png "Markdown specific commands")
## Markdown Insert Commands `SPC-m-i`

![Markdown Insert Commands](/images/blog/spacemacs/markdown-insert.png "Commands related to things you can insert into markdown, like links and images")

# Vim Keybindings
I never liked the emacs keybindings and never learned them well, but I can use Spacemacs with no problems. I don't think anything can beat vim keybindings in productivity and Spacemacs has perfect support. `gg` goes to the top of the file, `dt"` deletes up to the quotation mark, etc.

# Declarative Configuration
You declare all the plugins and configuration in a file called `.spacemacs` which should be sufficient to recreate your editor. You can easily create custom layers that wrap functions in keybindings. You could easily create an "npm mode" which runs `npm install` when you use the keybindings in a javascript file. This provides a clear way to organize a large number of keybindings without conflicts.

# Helm
Helm is a general purpose search and completion system that powers Spacemacs. It allows you to start typing and preview results in the bottom pane. You can search for things like emacs commands, filenames, text, and more.

## Search commands and keybindings `SPC-SPC`

![Helm Commands](/images/blog/spacemacs/helm-command-search.png "Search all possible commands and their keybindings")

## Search text in project `SPC-s-p`

![Helm Search Texts](/images/blog/spacemacs/helm-text-search.png "Search lines of text in files")

## Search file in project `SPC-p-f`

![Helm Search File Name](/images/blog/spacemacs/helm-file-name.png "Search by file name in project")
## Search text with context `SPC-s-s`

![Helm Swoop](/images/blog/spacemacs/helm-swoop.png "Search by text with surrounding context")

# Treemacs

Treemacs is a project sidebar that shows directory structure and let's you navigate files. It is similar to the sidebars in other editors, but you can navigate it with the keyboard using vim keybindings, like any other buffer. You can pin projects anywhere on the filesystem to the sidebar which makes working with multiple projects much easier.

![Treemacs](/images/blog/spacemacs/treemacs.png "Treemacs")

## Open project sidebar `SPC-f-t`

![Neotree Sidebar](/images/blog/spacemacs/neotree.png "Neotree project sidebar")

# Magit
Magit is a very comprehensive git UI that has replaced most terminal commands for me. You can stage files, view diffs, commit, rebase, push etc.

## Commands

![Magit Commands](/images/blog/spacemacs/magit-commands.png "All Magit Commands")

## Status

![Magit Status](/images/blog/spacemacs/magit-status.png "Magit Status")

## Diff

![Magit Diff](/images/blog/spacemacs/magit-diff.png "Commit diff tool")
## Log

![Magit Log](/images/blog/spacemacs/magit-log.png "Git History")

# Org-Mode
Org mode is a note taking and task management tool in emacs and spacemacs has especially good support. I really like the workflow in org because you can write notes in a collapsible outline view, then turn the notes into tasks and schedule them. There is a convenient org-capture keybinding that you can use to capture a random thought to be organized later. You can write customizations for tasks to be in different states like "blocked" or "waiting".

## Editing

![Org Todo](/images/blog/spacemacs/org-todo.png "Editing org mode headers")

## Agenda mode

![Org Agenda](/images/blog/spacemacs/org-agenda.png "Editing org mode headers")

# Language Support
Spacemacs has good support for most of the languages I use except for Java. It includes all the autocompletion, type hinting, and jump to definition that you're used to in an IDE. There are plenty of language specific keybindings for compiling, running tests, and installing packages. This is especially important if you like writing in multiple languages, because the keybindings try to be consistent between them. I use the same keybindings for evaluating code in the REPL for Clojure, Javascript, and Python.

## Typescript Mode
![Autocomplete](/images/blog/spacemacs/autocomplete.png "Typescript support in spacemacs")

# Writing
There is great support for writing English language in emacs as well. Emacs has great support for every text format I use like `markdown` and `org`.

## Ispell
I-Spell is a spell checker for emacs. You can go through the spelling errors using the keyboard, and either correct them or add them to a custom dictionary.

![Ispell](/images/blog/spacemacs/ispell.png "Spell checking in emacs")

## Pandoc
Pandoc allows you to convert between many text formats. I mostly use it for exporting markdown and org files to formats like PDF and DOCX. It can also convert markdown files to slidedecks using revealjs.

![Pandoc Commands](/images/blog/spacemacs/pandoc-commands.png "Example of commands available in pandoc")

![Pandoc Formats](/images/blog/spacemacs/pandoc-formats.png "Different formats available in pandoc")

## Writeroom Mode
Writeroom mode allows you to center the text in the middle of the screen for writing. You can completely disable all popups so you can focus on the text at hand.

![Writeroom Mode](/images/blog/spacemacs/writeroom.png "Focused writing mode for spacemacs")

# Snippets
Spacemacs includes a snippet manager called yasnippet, which let you create short blocks of code that you can expand and eliminate boilerplate. I use snippets for creating the YAML metadata at the top of the blog entries. Typing the command `yas-new-snippet` creates a new snippet file for the current mode.

```
# -*- mode: snippet -*-
# name: blog-header
# key: bh
# --
+++
uuid = "$1"
tags = ["blog", "index-page"]
title = "$2"
description = """ $3"""
+++

$0
```
`$1` through `$n` controls where your cursor jumps to when you hit tab. `$0` controls where the cursor starts after all the tab completions have been filled in. With this snippet I can type `bh` and expand it when I create a new blog post, to fill in the metadata in the correct format.
