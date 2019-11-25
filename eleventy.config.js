const htmlmin = require("html-minifier")
const process = require("process")
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

module.exports = eleventyConfig => {

  eleventyConfig.addShortcode("addMinCSS", function(src) {
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
    eleventyConfig.addFilter("dateDisplay", require("./filters/dates.js"))

    // Add a HTML timestamp formatter filter to Nunjucks
    eleventyConfig.addFilter("htmlDateDisplay", require("./filters/timestamp.js"))

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
    })

    // Collections
    eleventyConfig.addCollection('blog', collection => {
        return collection.getFilteredByTag('blog').reverse()
    })

    // Layout aliases
    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk')
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')

    // Include our static assets
    eleventyConfig.addPassthroughCopy("css")
    eleventyConfig.addPassthroughCopy("javascript")
    eleventyConfig.addPassthroughCopy("images")

  eleventyConfig.addPlugin(syntaxHighlight);
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
    }

}
