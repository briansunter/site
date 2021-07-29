//  General
const { gulp, src, dest, watch, series, parallel } = require('gulp');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

// Styles
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const tailwindcss = require('tailwindcss');
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
const imageminJpegtran = require('imagemin-jpegtran');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require('imagemin-gifsicle');

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
  staging: {
    source: '.staging/**/*',
    dest: '.tmp'
  },
  css: {
    source: './resources/css/styles/main.css',
    dest: '.staging/css/'
  },

  talks: {
    source: './talks/**/*.md',
    dest: '.staging/reveal-talks/'
  },

  cssBundle: {
    source: './resources/css/vendor/**/*.css',
    dest: '.staging/css/vendor/'
  },
  images: {
    source: './images/**/*.{gif,png,jpg,svg,ico}',
    dest: '.staging/images/'
  },
  vendorJs: {
    source: './resources/js/vendor/**/*.js',
    dest: '.staging/javascript/vendor/'
  },
  javascript: {
    source:
    [
      './resources/js/utilities/*.js',
      './resources/js/local/*.js',
    ],
    dest: '.staging/javascript/'
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

const optimizeImages = () => {
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
      imageminGifsicle({
        interlaced: true,
        optimizationLevel: 3
      }),
      //svg
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
      //jpg lossless
      imageminJpegtran({
        progressive: true
      }),
      //jpg very light lossy, use vs jpegtran
      imageminMozjpeg({
        quality: 90
      })
    ]), { fileCache }))
    .pipe(dest(paths.images.dest));
};

const moveAll = () => {
  return src(paths.staging.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(dest(paths.staging.dest));
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

const compileCSS = () => {
    return src(paths.css.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(postcss(postCSSPlugins))
    .pipe(dest(paths.css.dest))
    .pipe(notify({
        message: 'Tailwind Compile Success'
    }));
}

/**
 * Compile CSS & Tailwind
 */
const bundleCSS = () => {
  return src(paths.cssBundle.source)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(dest(paths.cssBundle.dest))
    .pipe(notify({
      message: 'Bundle CSS Complete'
    }));
};

const bundleJs = () => {
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
};

// const compileTalks = () => {
//   return src(paths.talks.source)
//     .pipe(plumber({ errorHandler: onError }))
//     .pipe(markdown())
//     .pipe(reveal())
//     .pipe(rename((path) => {
//       path.dirname += ('/' + path.basename);
//       path.basename = 'index';
//     }))
//     .pipe(dest(paths.talks.dest))
//     .pipe(notify({
//       message: 'Compile talks complete'
//     }));
// };
/**
 * Concatinate and compile scripts
 */
const compileJS = () => {
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
};


/**
 * Minify scripts
 * This will be ran as part of our preflight task
 */
const minifyJS = () => {
    return src(paths.javascript.dest + 'main.js')
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(terser())
    .pipe(dest(paths.javascript.dest))
    .pipe(notify({
        message: 'Javascript Minify Success'
    }));
}


/**
 * Watch files
 */
const watchFiles = () => {
    return watch([
      'site/*.njk',
      'site/includes/**/*.njk',
      './tailwind.config.js',
      './resources/css/styles/**/*.css',
      './resources/css/vendor/*.css',
      './images/**/*',
      './resources/js/**/*.js'

    ], compileAssets);
}


/**
 * CSS Preflight
 *
 * Compile CSS & Tailwind [PREFLIGHT]
 */
const compileCSSPreflight = () => {
    return src(paths.css.source)
    .pipe(postcss(
      postCSSPlugins
    ))
    .pipe(dest(paths.css.dest))
    .pipe(notify({
        message: 'CSS & Tailwind [PREFLIGHT] Success'
    }));
}


/**
 * Minify CSS [PREFLIGHT]
 */
const minifyCSSPreflight = () => {
    return src([
        '.dest/css/**/*.css',
        '!.dest/css/**/*.min.css',
        '!.tmp/css/**/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(dest('.dest/css'))
    .pipe(notify({
        message: 'Minify CSS [PREFLIGHT] Success'
    }));
}


exports.clear = series(() => fileCache.clear());

const compileAssets = series(optimizeImages, bundleJs, compileJS, bundleCSS, compileCSSPreflight, minifyCSSPreflight, minifyJS, moveAll);

/**
 * [BUILD] task
 * Run this once you're happy with your site and you want to prep the files for production.
 *
 * This will run the Preflight tasks to minify our CSS and scripts.
 *
 * Always double check that everything is still working. If something isn't displaying correctly, it may be because you need to add it to the PurgeCSS whitelist.
 */
exports.build = compileAssets;

/**
 * [DEFAULT] development task
 * This should always be the last in the gulpfile
 * This will run while you're building the theme and automatically compile any changes.
 * This includes any html changes you make so that the PurgeCSS file will be updated.
 */
exports.default  = series(compileAssets, watchFiles);
