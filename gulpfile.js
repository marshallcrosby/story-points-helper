/// <binding ProjectOpened='build' />
'use strict';

const gulp = require('gulp');

// HTML-related
const htmlmin = require('gulp-htmlmin');
const twig = require('gulp-twig');

// CSS-related
const sass = require('gulp-dart-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const del = require('del');

// JS-related
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const include = require('gulp-include');

// Utility-related
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const open = require('gulp-open');
const inject = require('gulp-inject-string');
const fs = require('fs');
const gulpReplace = require('gulp-replace');

const localhost = 'http://localhost:8080';

const roots = {
    src: './src',
    dist: './dist',
};

const replace = function (search, str) {
  return stream(function(fileContents) {
    return fileContents.replace(new RegExp(search, 'g'), str);
  });
}

// Clean task
gulp.task('clean-dist', async function (done) {
    return del([
        `${roots.dist}/temp`
    ]);
});

// Move html to dist
gulp.task('html', function (done) {
    return gulp.src([`${roots.src}/index.html`])
        .pipe(gulp.dest(`${roots.dist}`))
        .pipe(connect.reload());
});

// Twig to HTML
gulp.task('twig', function (done) {
    return gulp.src('src/_story-points-helper.twig')
        .pipe(twig())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(`${roots.dist}/temp`))
});

// Creates JS sourcemaps, concatenates JS files into one file based on array above, and minifies JS
gulp.task('js', function (done) {
    
    // Save css string
    let cssFileContent = fs.readFileSync('dist/temp/story-points-helper.css', 'utf8');
    
    // Save html string
    let modalFileContent = fs.readFileSync('dist/temp/_story-points-helper.html', 'utf8');
        
    return gulp.src([`${roots.src}/js/story-points-helper.js`], { sourcemaps: true })
        .pipe(include())
        .pipe(concat('story-points-helper.js'))
        
        // Inject css string into js
        .pipe(inject.replace('//import story-points-helper.css', cssFileContent.trim() ))
        
        // Inject html string into js
        .pipe(inject.replace('//import _story-points-helper.html', modalFileContent.trim() ))
        
        // Remove scss sourcemaps linkage from string
        .pipe(gulpReplace('/*# sourceMappingURL=story-points-helper.css.map */', ''))
        
        .pipe(minify({
            ext: {
                min: ".min.js",
            },
                preserveComments: 'some'
            
        }))
        .pipe(gulp.dest(`${roots.dist}/js`, { sourcemaps: '.' }))
        .pipe(connect.reload());
});

gulp.task('bookmarklet', function (done) {
    let icon = fs.readFileSync(`${roots.src}/js/story-points-icon.js`, 'utf8');
    let min = fs.readFileSync('dist/js/story-points-helper.min.js', 'utf8');
    let escapedJS = encodeURIComponent(min);

    return gulp.src('src/bookmarklet-import.twig')
        .pipe(twig())
        .pipe(gulpReplace('//import ${spICON}', icon.trim()))
        .pipe(gulpReplace('//import ${spBookmarklet}', escapedJS.trim()))
        .pipe(gulpReplace('%3B%0A%2F%2F%23%20sourceMappingURL%3Dstory-points-helper.min.js.map', ''))
        .pipe(gulp.dest(`./`))
});

// Creates Main CSS sourcemaps, converts SCSS to CSS, adds prefixes, and lints CSS
gulp.task('sass', function (done) {
    const plugins = [
        autoprefixer({ grid: true })
    ];

    return gulp.src([`${roots.src}/scss/story-points-helper.scss`])
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(`${roots.dist}/scss`))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${roots.dist}/temp`))
        .pipe(connect.reload());
});

// Runs a server to static HTML files and sets up watch tasks
gulp.task('server', function (done) {
    gulp.watch((`${roots.src}/**/*.html`), gulp.series('html'));
    gulp.watch((`${roots.src}/scss/**/*.scss`), gulp.series('twig', 'sass', 'js', 'bookmarklet', 'clean-dist'));
    gulp.watch((`${roots.src}/**/*.twig`), gulp.series('twig', 'sass', 'js', 'bookmarklet', 'clean-dist'));
    gulp.watch((`${roots.src}/js/**/*`), gulp.series('twig', 'sass', 'js', 'bookmarklet', 'clean-dist'));

    connect.server({
        root: roots.dist,
        livereload: true
    });

    setTimeout(function () {
        return gulp.src(__filename)
            .pipe(open({ uri: localhost }));
    }, 2000);

    done();
});

gulp.task('watch', function (done) {
    gulp.watch((`${roots.src}/**/*.html`), gulp.series('html'));
    gulp.watch((`${roots.src}/scss/**/*.scss`), gulp.series('twig', 'sass', 'js', 'bookmarklet', 'clean-dist'));
    gulp.watch((`${roots.src}/**/*.twig`), gulp.series('twig', 'sass', 'js', 'bookmarklet', 'clean-dist'));
    gulp.watch((`${roots.src}/js/**/*`), gulp.series('twig', 'sass', 'js', 'bookmarklet', 'clean-dist'));

    done();
});

gulp.task('build', gulp.series('twig', 'sass', 'html', 'js', 'bookmarklet', 'clean-dist'));

gulp.task('default', gulp.series('build', 'server', 'clean-dist'));
