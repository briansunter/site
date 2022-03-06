---
title: Cooklang - Manging Recipes in Git
date: 2022-03-06
excerpt: Cooklang is like markdown for recipes.
tags:
    - blog
    - cooking
    - programming
code_lang: ruby
code_excerpt: |
    Combine @basil leaves{20%g}, 
    @pine nuts {20%g} (or walnuts),
    and @garlic{3%cloves} in a 
    food processor and process 
    until very finely minced.
---
Cooklang is like markdown for recipes. It lets you write recipes in a human-readable format that a computer can parse to get the ingredient list, steps, etc.

Recipe sites have gotten so bloated that you need to read someone's entire life story to get the ingredients and steps. I'm a big fan of storing information in plain text in git, as well as [[cooking]], so I was happy to discover [CookLang](https://cooklang.org/).

I don't want to write my recipes in completely unstructured text, because then I can't do interesting things like generate shopping lists, convert units, get required cookware, etc. I also don't want to write them in a highly structured format like JSON because it would be too difficult to read and maintain.

I like cooklang because you can read it like a recipe if you want. I also like that you can list the ingredients throughout the steps and it automatically builds an ingredients list. This way you don't have to maintain a dedicated ingredients list and it's easier to update.

## Cooklang Recipe

This is what a cooklang recipe looks like.

``` ruby
>>title: Sous Vide Steak
>>description: A simple consistent way to cook great steak
>>source: https://www.seriouseats.com/food-lab-complete-guide-to-sous-vide-steak
Preheat a sous vide cooker to desired final temperature.

Season @steaks{450%g} generously with @salt and @pepper

Place in @sous vide bags{} along with @thyme{4%sprigs}, @rosemary{4%sprigs}, @garlic{4%cloves}, and @shallots{2%thinly sliced} and distribute evenly. 

Seal bags and place in water bath for desired time according to charts.

Gently lay steak in skillet, using your fingers or a set of tongs. 

Add @butter{30%g} (2 tablespoons).

After 15 to ~{30%seconds}, flip steak so that the second side comes into contact with the pan.
Repeat, flipping steak every ~{30%seconds}, until it has developed a nice brown sear, about ~{1.5%minutes} total.

Serve steak immediately
```

## Cooklang syntax
Although the text is human readable, this is what the special syntax means.

### Ingredients

`@ingredient{quantity%unit}` for example `@butter{30%g}`

Simple ingredients can be specified like `@salt.`

Ingredients with spaces can use curly braces `@ground pepper{}`

### Time
Time can be specified with `~{quantity%units}` like `~{30%seconds}`

### Metadata
Metadata can be added in the form of `>>key: value`

`>>source: https://www.seriouseats.com/food-lab-complete-guide-to-sous-vide-steak`

### Cookware
You can specify cookware needed with `#cookware{}` like `#potato masher{}`.

### Conclusion
Overall I'm really happy with cooklang. It was pretty easy to integrate with my static site and the [Obsidian](https://obsidian.md/) cooklang plugin works well. I hope to collect my favorite recipes and continue to tune them over time.

See [here for my complete list of recipes](/recipes/) categories by tag.

