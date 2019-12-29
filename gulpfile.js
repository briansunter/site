//  General
const { gulp, src, dest, watch, series, parallel } = require('gulp');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

// Styles
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');

// Scripts
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

const markdown = require('gulp-markdown');
const reveal = require('./gulp-reveal');

// Images
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');

// Post CSS
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const fileCache = new cache.Cache({cacheDirName: '.gulp-cache', tmpDir: __dirname});

/**
 * File paths
 */
const paths = {
  css: {
    source: './resources/css/styles/main.css',
    dest: '.tmp/css/'
  },

  talks: {
    source: './talks/**/*.md',
    dest: '.tmp/reveal-talks/'
  },

  cssBundle: {
    source: './resources/css/vendor/**/*.css',
    dest: '.tmp/css/vendor/'
  },
  images: {
    source: './images/**/*.{gif,png,jpg,svg,ico}',
    dest: '.tmp/images/'
  },
  vendorJs: {
    source: './resources/js/vendor/**/*.js',
    dest: '.tmp/javascript/vendor/'
  },
  javascript: {
    source:
    [
      './resources/js/utilities/*.js',
      './resources/js/local/*.js',
    ],
    dest: '.tmp/javascript/'
  }
};


/**
 * Errors function
 */
var onError = function(err) {
    notify.onError({
        title: "Gulp Error - Compile Failed",
        message: "Error: <%= error.message %>"
    })(err);

    this.emit('end');
}


/**
 * Tailwind extractor
 */
class TailwindExtractor {
    static extract(content) {
        return content.match(/[A-z0-9-:\/]+/g) || [];
    }
}

const optimizeImages = (done) => {
  return src(paths.images.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(cache(imagemin([
      //png
      imageminPngquant({
        speed: 1,
        quality: [0.95, 1] //lossy settings
      }),
      imageminZopfli({
        more: false
        // iterations: 50 // very slow but more effective
      }),
      //gif
      // imagemin.gifsicle({
      //     interlaced: true,
      //     optimizationLevel: 3
      // }),
      //gif very light lossy, use only one of gifsicle or Giflossy
      imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3, //keep-empty: Preserve empty transparent frames
        lossy: 2
      }),
      //svg
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
      //jpg lossless
      imagemin.jpegtran({
        progressive: true
      }),
      //jpg very light lossy, use vs jpegtran
      imageminMozjpeg({
        quality: 90
      })
    ]), { fileCache }))
    .pipe(dest(paths.images.dest));
  done();
};

const moveImages = (done) => {
  return src(paths.images.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(dest(paths.images.dest));
  done();
};
/**
 * Compile CSS & Tailwind
 */

const postCSSPlugins = [
  cssImport,
  cssvars,
  nested,
  autoprefixer,
  tailwindcss('./tailwind.config.js')
];

const compileCSS = (done) => {
    return src(paths.css.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(postcss(postCSSPlugins))
    .pipe(dest(paths.css.dest))
    .pipe(notify({
        message: 'Tailwind Compile Success'
    }));
    done();
}

/**
 * Compile CSS & Tailwind
 */
const bundleCSS = (done) => {
  return src(paths.cssBundle.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(dest(paths.cssBundle.dest))
    .pipe(notify({
      message: 'Bundle CSS Complete'
    }));
  done();
};

const bundleJs = (done) => {
  return src(paths.vendorJs.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(terser())
    .pipe(dest(paths.vendorJs.dest))
    .pipe(notify({
      message: 'Vendor JS Complete'
    }));
  done();
};

const compileTalks = (done) => {
  return src(paths.talks.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(markdown())
    .pipe(reveal())
    .pipe(rename((path) => {
      path.dirname += ('/' + path.basename);
      path.basename = 'index';
    }))
    .pipe(dest(paths.talks.dest))
    .pipe(notify({
      message: 'Compile talks complete'
    }));
  done();
};
/**
 * Concatinate and compile scripts
 */
const compileJS = (done) => {
    return src(paths.javascript.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(babel({
        presets: ['@babel/env'],
        sourceType: 'script'
    }))
    .pipe(concat('main.js'))
    .pipe(dest(paths.javascript.dest))
    .pipe(notify({
        message: 'Javascript Compile Success'
    }));
    done();
};


/**
 * Minify scripts
 * This will be ran as part of our preflight task
 */
const minifyJS = (done) => {
    return src(paths.javascript.dest + 'main.js')
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(terser())
    .pipe(dest(paths.javascript.dest))
    .pipe(notify({
        message: 'Javascript Minify Success'
    }));
    done();
}


/**
 * Watch files
 */
const watchFiles = (done) => {
    watch([
        'site/*.njk',
        'site/includes/**/*.njk',
    ], series(compileCSS));
    watch('./tailwind.config.js', series(compileCSS));
    watch('./resources/css/styles/**/*.css', series(compileCSS));
    watch('./talks/**/*.md', series(compileTalks));
    watch('./resources/css/vendor/*.css', series(bundleCSS));
    watch('./images/**/*', series(moveImages));
    watch('./resources/js/**/*.js', series(compileJS));
    done();
}


/**
 * CSS Preflight
 *
 * Compile CSS & Tailwind [PREFLIGHT]
 */
const compileCSSPreflight = (done) => {
    return src(paths.css.source)
    .pipe(postcss([
      ...postCSSPlugins,
        purgecss({
            content: [
                'site/*.njk',
                'site/includes/**/*.njk',
            ],
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ['html', 'njk'],
                }
            ],
            /**
             * You can whitelist selectors to stop purgecss from removing them from your CSS.
             * see: https://www.purgecss.com/whitelisting
             *
             * Any selectors defined below will not be stripped from the main.min.css file.
             * PurgeCSS will not purge the main.css file, as this is useful for development.
             *
             * @since 1.0.0
             */
            whitelist: [
                'body',
                'html',
                'h1',
                'h2',
                'h3',
                'p',
                'blockquote',
              'intro',
              'pre',
              'code'
            ],
        })
    ]))
    .pipe(dest(paths.css.dest))
    .pipe(notify({
        message: 'CSS & Tailwind [PREFLIGHT] Success'
    }));
}


/**
 * Minify CSS [PREFLIGHT]
 */
const minifyCSSPreflight = (done) => {
    return src([
        '.tmp/css/**/*.css',
        '!.tmp/css/**/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(dest('.tmp/css'))
    .pipe(notify({
        message: 'Minify CSS [PREFLIGHT] Success'
    }));
}


exports.clear = series((done) => fileCache.clear(null,done));

/**
 * [BUILD] task
 * Run this once you're happy with your site and you want to prep the files for production.
 *
 * This will run the Preflight tasks to minify our CSS and scripts, as well as pass the CSS through PurgeCSS to remove any unused CSS.
 *
 * Always double check that everything is still working. If something isn't displaying correctly, it may be because you need to add it to the PurgeCSS whitelist.
 */
exports.build = series(optimizeImages, compileTalks, bundleJs, compileJS, bundleCSS, compileCSSPreflight, minifyCSSPreflight, minifyJS);

/**
 * [DEFAULT] development task
 * This should always be the last in the gulpfile
 * This will run while you're building the theme and automatically compile any changes.
 * This includes any html changes you make so that the PurgeCSS file will be updated.
 */
exports.default = series(moveImages, bundleJs, bundleCSS, compileCSS, compileJS, watchFiles, compileTalks);
