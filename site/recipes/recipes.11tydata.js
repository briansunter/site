module.exports = {
    eleventyComputed: {
      schema: data => (
      {
        "@context": "https://schema.org/",
        "@type": "Recipe",
        "name": data.title,
        "image": [
          "https://briansunter.com/images/recipes/recipe.jpg",
          "https://briansunter.com/images/blog/five-minute-journal/journal.jpg",
          "https://briansunter.com/images/blog/how-to-take-smart-notes-roam-research/smart-notes-cover.jpg"
        ],
        "author": {
          "@type": "Person",
          "name": "Brian Sunter"
        },
        "datePublished": data.date,
        "description": data.description,
        "prepTime": "PT20M",
        "cookTime": "PT30M",
        "totalTime": "PT50M",
        "keywords": data.tags,
        "recipeYield": "10",
        "recipeCategory": data.tags[0] || "Dessert",
        "recipeCuisine": data.tags[0]|| "American",
        "nutrition": {
          "@type": "NutritionInformation",
          "calories": "270 calories"
        },
        "recipeIngredient": data.ingredients,
        "recipeInstructions": data.steps.map(s => ({
            "@type": "HowToStep",
            "name": s.split(' ')[0] || "Preheat",
            "text": s,
            "url": `https://briansunter.com/${data.page.url}`,
            "image": "https://briansunter.com/images/recipes/recipe.jpg"
    
        })),
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "ratingCount": "18"
        },
        "video": {
          "@type": "VideoObject",
          "name": data.title,
          "description": data.description,
          "thumbnailUrl": [
          "https://briansunter.com/images/blog/python.png",
          "https://briansunter.com/images/blog/five-minute-journal/journal.jpg",
          "https://briansunter.com/images/blog/how-to-take-smart-notes-roam-research/smart-notes-cover.jpg"
           ],
          "contentUrl": "http://www.example.com/video123.mp4",
          "embedUrl": "http://www.example.com/videoplayer?video=123",
          "uploadDate": "2018-02-05T08:00:00+08:00",
          "duration": "PT1M33S",
          "interactionStatistic": {
            "@type": "InteractionCounter",
            "interactionType": { "@type": "WatchAction" },
            "userInteractionCount": 2347
          },
          "expires": "2029-02-05T08:00:00+08:00"
        }
      })
    }
  };