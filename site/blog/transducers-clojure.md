---
title: Transducers in Clojure
date: 2019-06-25
featured_image_: /images/blog/spacemacs/writeroom.png
image_caption: Photo by Dylan Gillis on Unsplash
excerpt: What are transducers and why would I want to use them?
code_lang: clojure
code_excerpt: >
  (def double-even-xforms 
  	(comp 
  		(filter even?) 
  		(map #(* 2 %)))) 
  		(println "hello")

tags:
    - blog
    - programming
    - functional
    - clojure
---
# Transducers in Clojure

## Sum a Seq of Numbers
You may already be familiar with a function called `reduce`, which takes a seq and a "reducing function" as params. The reducing function is called with each element in the seq and with a "reduction state so far" param. A good use case for this is finding the sum of a seq of numbers.

``` clojure
(reduce + '(1 2 3 4 5 6 7 8 9 10))
```

`+` takes each number in the seq and adds it to the "sum so far"
``` clojure
=> (+ 1)
1

=> (+ 1 2)
3

=> (+ 3 3)
6

=> (+ 6 4)
10

;; [...]
```

Maybe you would do something like this in a mutable imperative language.

``` js
var x = 0;
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (i = 0; i < numbers.length ; i++) {
   x += numbers[i];
}

x
```

## Sum Even Numbers
Now suppose we want to find the sum of only even numbers.

Our first instinct might be to first filter over the list and then pass that into reduce.

``` clojure
(reduce + (filter even? (range 1 11)))
```

This is perfectly fine, but we're making multiple passes over the data. `filter` is called for every element in the seq and then `reduce` makes another pass.


Our imperative function continues to become more complex, but it does have the advantage of only passing over the data once.
``` js
var x = 0;
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (i = 0; i < numbers.length ; i++) {
   if (numbers[i] % 2 == 0) {
       x += numbers[i];
   }
}

x
```

## Sum Doubled Even Numbers

Now we want the sum the doubled even numbers. We want to filter the even numbers, double them. Now we're making multiple extra passes over the data. Also, the data transformations are tied together and could be made more composable.

``` clojure
(reduce + (map #(* 2 %) (filter even? (range 1 11))))
```
We can rewrite this more nicely with the thread-last macro.

``` clojure
(reduce + (->>
           (range 1 11)
           (filter even?)
           (map #(* 2 %))))
```
Our imperative program has its logic hopelessly tied together. But even with it's flaws, it's still computationally efficient.

``` js
var x = 0;
var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (i = 0; i < numbers.length ; i++) {
   if (numbers[i] % 2 == 0) {
       x += numbers[i] * 2;
   }
}
```

We can write this nicely in es6, but it has the same problems as the Clojure version. It also makes multiple passes over the data.

``` js
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .filter(i => i % 2 == 0)
    .map(i => i * 2)
    .reduce((a, i) => a + i)

```

## One Pass Clojure Refactor
Could we refactor the clojure version to at do everything in one pass?
Instead of transforming the collection beforehand, we could transform it in the reduce function. Now it goes over the data in one pass, but the logic is intertwined like the imperative version.

```clojure
(reduce (fn [a i]
          (if (even? i)
           (+ a (* 2 i))
           a))
        0
        (range 1 11))

```
One pass es6 comparison

``` js
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .reduce((a, i) => {
      if (i % 2 == 0) {
         return a + (i * 2);
      }  else {
         return a;
      }
     },0)

```

## Transducers
How can do everything in one pass and separate the notion of data transformation from the reducing function? Transducers are one way. Clojure has added extra arities to functions like `map` and `filter`. `filter` called like `(filter even?)` will return a transducer.

## What is a Transducer?
Transducers are "function factories". They are functions that take functions as params and return functions. The type of functions they take and return are reducing functions.

From the clojure docs:

### Reduce function signature
```
whatever, input -> whatever
```

A transducer (sometimes referred to as xform or xf)
is a transformation from one reducing function to another:

### Transduce function signature
`(whatever, input -> whatever)` -> `(whatever, input -> whatever)`

## The `comp` function
Remember `(fog)(x) and (gof)(x)` from algebra class? That's similar to the `comp` function. It takes a series of functions and returns the composition of those functions. Using comp we can build up ordered transformations just using functions, including transducers.

``` clojure
(str (+ 8 8 8))
```


``` clojure
((comp str +) 8 8 8)
```

``` clojure
((comp clojure.string/reverse str +) 8 8 8)
```

## Transducer Data Transformation Pipeline
With the new transducer arities of `map` and `filter` we can create data transformation pipelines using `comp`. These look similar to our thread last solution.
``` clojure

(def double-even-xforms
(comp
  (filter even?)
  (map #(* 2 %))))

```
We now have a transducer, `double-even-xforms`. This describes the act of filtering the even numbers and doubling them, before passing them into the reducing function. We can use this in different ways.

If we want to transform a collection we can use `into`
```clojure
(def doubled-evens (into [] double-even-xforms (range 1 11)))

doubled-evens
```
If we didn't care about multiple passes over the data we could pass this into `reduce`.

```clojure
(reduce + 0 doubled-evens)

```
We can use transduce to find it in one pass.
```clojure
(transduce double-even-xforms + 0 (range 1 11))
```
