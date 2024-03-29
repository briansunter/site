const htmlmin = require("html-minifier");
const process = require("process");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require("@piraces/eleventy-plugin-pwa");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const randomColor = require('randomcolor');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');
const anchor = require('markdown-it-anchor')
const markdownIt = require('markdown-it');
const mdIterator = require('markdown-it-for-inline')
const markdownItAnchor = require('markdown-it-anchor')
const cooklang = require('cooklang');
const { html5Media } = require('markdown-it-html5-media');

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};


module.exports = eleventyConfig => {

  const markdownItOptions = {
      html: true,
      linkify: true
  };

  const md = markdownIt(markdownItOptions)
  .use(require('markdown-it-footnote'))
  .use(markdownItAnchor, { 
    permalink: anchor.permalink.headerLink()
})
  .use(require('markdown-it-attrs'))
  .use(html5Media)
  .use(require('markdown-it-textual-uml'))
  .use(function(md) {
      // Recognize Mediawiki links ([[text]])
      md.linkify.add("[[", {
          validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
          normalize: match => {
              const parts = match.raw.slice(2,-2).split("|");
              parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
              match.text = (parts[1] || parts[0]).trim();
              if (parts[0].trim()==="notes"){
                match.url = '/notes/'
              } else {
              const linkName = parts[0].trim().replace(/ /g , '-');
              match.url = `/notes/${linkName}/`;
              }
              match.text = `[[${match.text}]]`;
          }
      })
  }).use(mdIterator, 'url_new_win', 'link_open', function (tokens, idx) {
    const [attrName, href] = tokens[idx].attrs.find(attr => attr[0] === 'href')
    
    if (href && (!href.includes('briansunter.com') && !href.startsWith('/') && !href.startsWith('#'))) {
      tokens[idx].attrPush([ 'target', '_blank' ])
      tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ])
    }
  })
  
  md.linkify.set({ fuzzyLink: false }); eleventyConfig.addFilter("markdownify", string => {
      return md.render(string)
  })

  eleventyConfig.setLibrary('md', md);

  eleventyConfig.addPlugin(lazyImagesPlugin,{scriptSrc: '/javascript/vendor/lazysizes-5.3.2.min.js'});

  eleventyConfig.addPlugin(pluginPWA, {
    swDest: "./dist/service-worker.js",
    globDirectory: "./dist",
    maximumFileSizeToCacheInBytes: 10000000, 
    globIgnores: ["**/*.jpg","**/*.png","**/*.gif, **/*.mp4"]
  });

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addShortcode("randomLightColor", (s) => randomColor({luminosity: 'light',seed: s}));

  eleventyConfig.addShortcode("addMinCSS", (src) => {
    let newSrc = src.split('.');
    let suffix = newSrc.pop();
    if (process.env.ELEVENTY_ENV !== 'development') {
      newSrc.push('min');
    }
    newSrc.push(suffix);
    newSrc = newSrc.join('.');

    return `<link rel="stylesheet" href="${newSrc}"  media="none" onload="if(media!='all')media='all'">`;
  });

    // Add a readable date formatter filter to Nunjucks
    eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"));

    // Add a HTML timestamp formatter filter to Nunjucks
    eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"));

    // Minify our HTML
    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
        if( outputPath.endsWith(".html") ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true
            });
            return minified;
        }
        return content;
    });

    // Collections
    eleventyConfig.addCollection('blog', collection => {
       return collection.getFilteredByTag('blog').reverse();
    });
  eleventyConfig.addCollection("notes", function (collection) {
        return collection.getFilteredByGlob(["site/notes/**/*.md", "notes.md"]);
    });
    // Layout aliases 
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

    eleventyConfig.addLayoutAlias('note', 'layouts/note.njk');
    // Include our static assets
  eleventyConfig.setWatchThrottleWaitTime(500); 
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addWatchTarget(".tmp");

  eleventyConfig.addPassthroughCopy({".tmp/css": "css"});
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({".tmp/javascript": "javascript"});
  eleventyConfig.addPassthroughCopy({".tmp/images": "images"});
  eleventyConfig.addPassthroughCopy({"videos": "videos"});
  eleventyConfig.addPassthroughCopy("site/mind-maps");
  eleventyConfig.addPassthroughCopy({"resources/static/keybase.txt": "keybase.txt"});
  eleventyConfig.addPassthroughCopy({"resources/graph/": "graph/"});
  eleventyConfig.addPassthroughCopy({"resources/data/": "data/"});
  eleventyConfig.addPassthroughCopy({".tmp/talks": "talks"});

  eleventyConfig.addPlugin(syntaxHighlight);

 eleventyConfig.addDataExtension("cook", contents => {
   const recipe = new cooklang.Recipe(contents)
   const response = {};
   response.ingredients = recipe.ingredients.map(({quantity,units,name}) => `${quantity} ${units} ${name}`);
   response.steps = [];
   for (let i = 0; i <recipe.steps.length; i++){
     const step = recipe.steps[i];
     let lineStr = ''
     for (let j = 0; j < step.line.length;j++ ){
       line = step.line[j];
      if (typeof line === 'string'){
        lineStr += line;
      } else {
        lineStr += `${line.quantity ? line.quantity + " " : ""}${line.units? line.units + " " : ""}${line.name}`
      }
     }
     response.steps.push(lineStr);
   }

   for (let i = 0; i < recipe.metadata.length; i++){
     const meta = recipe.metadata[i];
     if (meta.key === 'tags'){
       const tags = meta.value.split(',').map(x => x.trim()).filter(x => x !== "");
       tags.push('recipe');
       response.tags = tags;
     } else {
       response[meta.key]=meta.value;
     }

   }
   if (!response.tags){
     response.tags = ['recipe'];
   }
   return response;
  });

  eleventyConfig.addPlugin(cacheBuster({outputDirectory: 'dist/'}));

  eleventyConfig.addExtension("cook", {
    compile: async (inputContent) => {
      return async () => {
        return inputContent;
      };
    }
  });

    eleventyConfig.addCollection('recipes', collection => {
      const recipeMap = {};
      const recipes = collection.getFilteredByTag('recipe');

      for (const recipe of recipes){
        
        for (const tag of recipe.data.tags){
          const r = {data:recipe.data, url: recipe.url};
          if (recipeMap[tag]){
            recipeMap[tag].add(r);
          } else {
            recipeMap[tag] = new Set([r]);
          }
        }
      }
      delete recipeMap['recipe'];

      for (const k of Object.keys(recipeMap)){
        recipeMap[k] = Array.from(recipeMap[k]);
      }
      const recipeTypes = Object.keys(recipeMap);
      return {recipeTypes, recipeMap};
    });
    return {
        templateFormats: ["cook", "md", "njk"],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        passthroughFileCopy: true,

        dir: {
            input: 'site',
            output: 'dist',
            includes: 'includes',
            data: 'globals'
        }
    };

};
