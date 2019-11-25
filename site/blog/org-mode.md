---
title: Org Mode
date: 2019-06-25
featured_image: /images/blog/spacemacs/writeroom.png
image_caption: Photo by Dylan Gillis on Unsplash
excerpt: My workflow in org-mode and spacemacs
tags:
    - blog
    - business
---

I constantly have a stream of events happening and it's sometimes a struggle to keep everything organized. One of the best tools I've used is org-mode in Emacs.

# What is org-mode
org-mode is a format like markdown and a plugin for the emacs editor. It allows for both note-taking and task management. The format is very similar to markdown and it's easy to export to markdown from org-mode. Everything is stored in a simple flat text format.

The syntax looks like this:
``` markdown
* Welcome to Org mode
  Welcome, and thanks for trying out Org mode. Making outlines in
  Org is very simple. It is just text! Just start typing.
* This is a headline, it starts with one or more stars
  A heading has one star, a sub-heading two, etc.
* Working with lists
** You can have sub bullet points in lists
** You can change indent levels with OPTION-RIGHT or OPTION-LEFT
You can also write free text notes underneath headings
```

# org-mode Flow
org-mode's unique combination of note taking and task management suits my working style. I like to brainstorm or take notes in meetings in  a multi level bullet point format with free text in-between. You can then turn some of these nested bullet points into tasks. There are a number of keybindings in emacs to supports working with the notes such as collapsing and changing indent levels.

``` markdown
* Working with lists
** TODO learn mode about org-mode lists
```

# Tagging
I prefer to use tagging to organize my notes. It allows you to search across heading and files for tags. Tags in the top level header are automatically applied to nested elements. To add a tag just add `:foo:bar:` to the header.
``` markdown
* Working with lists :orglist:
** TODO learn mode about org-mode lists :learning:
```


# org-capture
Whenever you have a thought, you can use an org-capture keybding to create an org note with a customizable template. You could create one to make a new task or save a link from your clipboard.

# org-tags-view
Org mode allows you to search your tags and is the method I prefer to organize my notes. You can search a directory for notes with many different tag queries. My keybinding is `SPC-a-o-m`.

``` markdown
Headlines with TAGS match: clojure
Press ‘C-u r’ to search again
  notes:      Figure out how to write Clojure macros                                                      :clojure:macros:programming:
```

``` markdown
+work-boss
Select headlines tagged ‘work’, but discard those also tagged ‘boss’.

work|laptop
Selects lines tagged ‘work’ or ‘laptop’.

work|laptop+night
Like before, but require the ‘laptop’ lines to be tagged also ‘night’.

Instead of a tag, you may also specify a regular expression enclosed in curly braces.
For example, ‘work+{^boss.*}’ matches headlines that contain
the tag ‘:work:’ and any tag starting with ‘boss’.
```

# org-agenda
Org agenda allows you to gather up all your todos and schedule them. I like having a big backlog of tasks and queuing them up at the beginning of the week.

You can use `SPC-a-o-t` or `org-todo-list` to capture all todo headers from your notes. You cant hen use `,s` to schedule the task at a specific time.

``` markdown
Global list of TODO items of type: ALL
Press ‘N r’ (e.g. ‘0 r’) to search again: (0)-[ALL] (1)TODO (2)DONE
  notes:      TODO  2019-10-14 Mon> Watch Simple Made Easy
  notes:      TODO  2019-10-14 Mon  Read how to design computer programs
  notes:      TODO Read "How to Solve it"
  notes:      TODO Read Coders at Work
  notes:      TODO Read a book on agile
  notes:      TODO Start writing one blog post a week
  notes:      TODO Read Getting things done book

```
After you schedule the tasks, you can use ~SPC-a-o-a~ or ~org-agenda-list~ to view the weekly agenda, where you can mark tasks complete, take notes on the task, or log work time on the ask.

``` markdown 
Week-agenda (W42):
Monday     14 October 2019 W42
  notes:      TODO Read getting things done                                                                                                                                                                                                                              :book:
  notes:      TODO Read how to design computer programs                                                                                                                                                                                                                  :book:
Tuesday    15 October 2019
Wednesday  16 October 2019
Thursday   17 October 2019
Friday     18 October 2019
Saturday   19 October 2019
Sunday     20 October 2019
```
