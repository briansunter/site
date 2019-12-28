---
title: fzf - a terminal fuzzy finder
featured_image: /images/blog/fzf-chrome-history.gif
image_caption: fzf terminal fuzzy finder
date: 2019-12-19
code_lang: bash
code_excerpt: |

tags:
  - blog
  - terminal
  - bash
  - productivity

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


![fzf interactive cd](/images/blog/fzf-cd.gif "interactive cd")

# fasd with fzf
you can integrate fzf frecency search with fzf
``` bash
unalias z 2> /dev/null
z() {
  [ $# -gt 0 ] && fasd_cd -d "$*" && return
  local dir
  dir="$(fasd -Rdl "$1" | fzf -1 -0 --no-sort +m)" && cd "${dir}" || return 1
}
```

![fzf fasd](/images/blog/fzf-fasd.gif "fsf with fasd frecency integration")

# Chrome Terminal History Search
Just for fun you can search Google Chrome history with fzf from the terminal

``` bash
# c - browse chrome history
c() {
  local cols sep google_history open
  cols=$(( COLUMNS / 3 ))
  sep='{::}'

  if [ "$(uname)" = "Darwin" ]; then
    google_history="$HOME/Library/Application Support/Google/Chrome/Default/History"
    open=open
  else
    google_history="$HOME/.config/google-chrome/Default/History"
    open=xdg-open
  fi
  cp -f "$google_history" /tmp/h
  sqlite3 -separator $sep /tmp/h \
    "select substr(title, 1, $cols), url
     from urls order by last_visit_time desc" |
  awk -F $sep '{printf "%-'$cols's  \x1b[36m%s\x1b[m\n", $1, $2}' |
  fzf --ansi --multi | sed 's#.*\(https*://\)#\1#' | xargs $open > /dev/null 2> /dev/null
}

```

![fzf chrome history](/images/blog/fzf-chrome-history.gif "fsf chrome history search")
