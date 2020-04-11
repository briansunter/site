const htmlmin = require("html-minifier");
const process = require("process");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPWA = require("eleventy-plugin-pwa");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const randomColor = require('randomcolor');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};


module.exports = eleventyConfig => {

  eleventyConfig.addPlugin(lazyImagesPlugin);

  eleventyConfig.addPlugin(pluginPWA);

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

    return `<link rel="stylesheet" href="${newSrc}">`;
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

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

    // Include our static assets
  eleventyConfig.addPassthroughCopy({".tmp/css": "css"});
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({".tmp/javascript": "javascript"});
  eleventyConfig.addPassthroughCopy({".tmp/images": "images"});
  eleventyConfig.addPassthroughCopy("site/mind-maps");
  eleventyConfig.addPassthroughCopy({"resources/static/keybase.txt": "keybase.txt"});
  eleventyConfig.addPassthroughCopy({".tmp/reveal-talks": "talks"});

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPlugin(cacheBuster({outputDirectory: 'dist/'}));

    return {
        templateFormats: ["md", "njk"],
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
