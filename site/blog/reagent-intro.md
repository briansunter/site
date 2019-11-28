---
title: Reagent Intro
date: 2019-06-25
featured_image_: /images/blog/spacemacs/writeroom.png
image_caption: Photo by Dylan Gillis on Unsplash
excerpt: An introduction to Clojure with Reagent.
code_excerpt: >
  (defn hello [name]
     [:p (str "Hello " name "!")])
code_lang: clojure
tags:
    - blog
    - programming
    - functional
    - frontend
---
# Intro to Clojurescript with Reagent
The Javascript community has finally started rallying around the power of functional programming and immutability with React, but what would this look like in a language that supported these ideas really well?

# What is Reagent?
Reagent is a Clojurescript wrapper around React. It simplifies the interface to React and allows us to define our UI using Clojure data structures, instead of JSX.

# Hello World Component
Let's start by just getting something on the screen.
Define a simple Reagent (React) component. Components are functions that take 0 or more arguments and return a hiccup data structure.

``` clojure 
;; REPL function syntax for importing.
;; From a file, the syntax is:
;; (ns my-ns.core
;; (:require [reagent.core :as r]))
(require '[reagent.core :as r])

(defn hello [name]
[:p (str "Hello " name "!")])

(r/render-component [hello "World"] (.getElementById js/document "hello-world"))
```

``` html
 <div id="hello-world">Loading...</div>
 ```

# Clojure functions and hiccup
`defn` defines a function in Clojure. Our function takes one `name` parameter and returns a vector. The last "expression" in the function is the return value.

``` clojure
(defn hello [name]
   [:p (str "Hello " name "!")])
```

# Calling our Function
The first thing in a set of parens is a function that will be called with the following expressions as arguments. Our function will return an array `[:p "Hello World!"]` with a `:keyword` as the first item signifying the type of element to be rendered, and the content of the element in the second position.

``` clojure
(hello "World")
```

Some functions can take any number of arguments, like `str`

``` clojure
(str "this" "function" "can" "take" "many" "args")
```

# Keywords
Keywords are named values commonly used in map keys. They are symbols prefixed with a `:` like `:my-keyword` or `:h1`.

# Vectors and Map Syntax in Clojure
## Vector Syntax []
The syntax for a vector is

``` clojure 
[1 2 "three" "four"]
```

The elements are separated by whitespace in between brackets.
`,` is treated as whitespace.


## Map Syntax {}
The syntax for a map is

``` clojure
{:key-1 "value" :key-2 "value"}
```

Maps are a series of pairs in between braces.

# Hiccup
Hiccup is a syntax for writing UIs with data. It is just a vector of vectors. The first item in the vector can be a `:keyword`, which will be rendered to a `<div></div>`.

``` clojure
(defn my-title
  [title]
  [:div
   [:h1 title]])

[my-title "My Title"]
```

We can combine components, where a function that returns a component is the first element of the vector.

``` clojure
(defn my-app
  []
  [:div
   [my-title "My Title"]
   [:p "This is starting to get cool"]])
```

There is a shorthand for applying css classes and ids on elements.

`[:h1#my-id.my-class "foo"]`

`:keyword` components can optionally take a first argument of a map, in the form `{:key "value"}`

which will be rendered as `<div key="value"></>`

``` clojure
[:a {:href "https://google.com"} "Link to google"]
```


``` clojure
(defn draw-pixel! [canvas x y color]
(let [ctx (.getContext canvas "2d")
scale 2]
(set! (.-fillStyle ctx) color)
(.fillRect ctx (* scale x) (* scale y) scale scale)))
(defn reset-canvas! [canvas]
(let [ctx (.getContext canvas "2d")]
(set! (.-fillStyle ctx) "white")
(.fillRect ctx 0 0 (.-width canvas) (.-height canvas))))
(defn draw-bw-wallpaper! [canvas a b side]
(let [points 200]
(dotimes [i points]
(dotimes [j points]
(let [x (+ a (* i (/ side points)))
y (+ b (* j (/ side points)))
c (int (+ (* x x) (* y y)))]
(when (even? c)
(draw-pixel! canvas i j "black")))))))

(def canvas (.createElement js/document "canvas"))
(.appendChild (.getElementById js/document "black-and-white") canvas)
(draw-bw-wallpaper! canvas 5 5 9)

```
