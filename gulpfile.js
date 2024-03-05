const { src, dest, watch, parallel, series} = require('gulp');
const browserSync = require('browser-sync').create();
const include = require('gulp-include');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2')
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const svgSprite = require('gulp-svg-sprite');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');

function pages() {
    return src('app/pages/src/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app'))
        .pipe(browserSync.stream());
}

function styles() {
    /*return src([
        'app/scss/*.scss',
        'node_modules/swiper/swiper-bundle.min.css',
        ])
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version']}))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'compressed'}))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());*/
    return src('app/scss/*.scss')
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version']}))
        .pipe(scss({ outputStyle: 'compressed'}))
        .pipe(src('node_modules/swiper/swiper-bundle.min.css'))
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function fonts() {
    return src('app/fonts/src/*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
}

function images() {
    return src(['app/images/src/*.*', '!app/images/src/*.svg'])
        .pipe(newer('app/images'))
        .pipe(avif({ quality: 50}))
        .pipe(src(['app/images/src/*.*']))
        .pipe(newer('app/images'))
        .pipe(webp())
        .pipe(src(['app/images/src/*.*']))
        .pipe(newer('app/images'))
        .pipe(imagemin())
        .pipe(dest('app/images'))
}


function sprites() {
    return src('app/images/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('app/images'))
}

function scripts() {
    return src([
            'app/js/src/script.js',
            /*'node_modules/swiper/swiper-bundle.js',*/
        ])
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}



function building() {
    return src([
        'app/index.html',
        'app/css/*.*',
        'app/js/*.*',
        'app/fonts/*.*',
        'app/images/*.*'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function watching() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    })
    watch(['app/pages/src/*.*'], pages)
    watch(['app/components/*.*'], pages)
    watch(['app/js/src/*.*'], scripts)
    watch(['app/scss/style.scss'], styles)
    watch(['app/images/src/*.*'], images).on('change', browserSync.reload);
}

function cleanDist() {
    return src(['dist/*', '!dist'])
    .pipe(clean())
}

exports.pages = pages;
exports.scripts = scripts;
exports.styles = styles;
exports.fonts = fonts;
exports.images = images;
exports.sprites = sprites;
exports.building = building;
exports.watching = watching;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, building)
exports.default = parallel(pages, scripts, styles, images, watching);