var gulp         = require('gulp'),
    browsersync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss     = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    sourcemaps   = require('gulp-sourcemaps'),
    gutil        = require('gulp-util');

// 自动添加浏览器前缀的配置参数
var autoprefixerOptions = {
    browser: ['last 2 version', 'Android >= 4.0']
};

gulp.task('bs', function () {
    browsersync({
        files: ['components/**'],
        server: {
            directory: true,
            baseDir: './components'
        },
        browser: 'firefox',
        reloadDelay: 1,
        injectChanges: true
    });
});

gulp.task('demo-sass', function () {
    gulp.src('components/demo/scss/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', function (error) {
                gutil.log(error);
                this.emit('end');
            }))
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(rename({suffix: '.min'}))
            .pipe(cleancss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('components/demo/css'));
});

gulp.task('w-demo', function () {
    gulp.watch('components/**/*.scss', ['demo-sass']);
});

gulp.task('default', ['bs', 'w-demo']);