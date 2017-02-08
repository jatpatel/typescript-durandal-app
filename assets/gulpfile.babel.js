var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var ts = require('gulp-typescript');
var typescript = require('typescript');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var newer = require('gulp-newer');
var durandal = require('gulp-durandal'),
    runSequence = require('run-sequence'),
    merge = require('merge-stream'),
    gutil =  require('gulp-util'),
    watch = require('gulp-watch'),
    batch = require('gulp-batch');

gulp.task('serve', ['compile-ts', 'copy-javascript', 'copy-fonts', 'compile-css', 'compile-views'], function () {
    
    watchAndBatchFiles({
        src: 'app/**/*.ts',
        task: (done) => {
            runSequence('compile-ts', done)
        },
        dest: true
    });
    
    watchAndBatchFiles({
        src: 'app/**/*.html',
        task: (done) => {
            gulp.start('compile-views', done);
        },
        dest: '.dev/app/**/*.html'
    });

    watchAndBatchFiles({
        src: 'css/**/*.{less,css}',
        task: (done) => {
            gulp.start('compile-css', done)
        },
        dest: '.dev/css/**/*.css'
    });

    //boostrap fonts
    gulp.start('copy-fonts');

    return browserSync({
        notify: false,
        logPrefix: 'BS',
        baseDir: '.dev',
        port: 3001,
        ghostMode: false,
        startPath: "/",
        server: {
            baseDir: ['.dev/', '.'],
        }
    });
});

// default & sub-task required to perform to serve application
gulp.task('default', ['serve']);

gulp.task('clean', () => {
    return del('.dev/');
});

gulp.task('compile-ts', () => {
    return gulp.src(['typings/index.d.ts', 'app/**/*.ts'])
        .pipe(ts({
            typescript: typescript,
            outDir: 'js',
            module: 'amd',
            target: 'es5',
            noEmitOnError: true,
            experimentalDecorators: true
        }))
        .pipe(gulp.dest('.dev/app'))
});

gulp.task('copy-javascript', () => {
    return gulp.src(['app/**/*.js', 'app/**/*.json'])
        .pipe(newer('.dev/app'))
        .pipe(gulp.dest('.dev/app'));
});

gulp.task('compile-css', () => {
    return gulp.src('css/**/*.less')
        .pipe(less('css/**/*.less'))
        .pipe(autoprefixer({
            browsers: ['last 1 version', 'ie 9']
        }))
        .pipe(gulp.dest('.dev/css'));
});

gulp.task('copy-fonts', () => {
    return gulp.src(['bower_components/bootstrap/fonts/**/*.*'])
        .pipe(gulp.dest('.dev/fonts'));    
});

gulp.task('compile-views', () => {
    return gulp.src(['app/**/*.html'])
        .pipe(newer('.dev/app'))
        .pipe(gulp.dest('.dev/app'));
});

// setup watchAndBatchFiles to debounce and batch requests using gulp-watch, gulp-batch.
function watchAndBatchFiles(options) {
    const task = options.task || null;
    const dest = options.dest || false;
    watch(options.src, {usePolling: true},
        batch({timeout: 500}, (events, nextBatch) => {
            var editedFiles = [];
            events
                .on('data', (file) => {
                    editedFiles.push(file.basename);
                })
                .on('end', () => {
                    const afterTask = () => {
                        console.log('edited files: ' + editedFiles.join(', '));
                        if (dest) {
                            if (typeof dest == 'boolean')
                                browserSync.reload();
                            else
                                browserSync.reload(dest);
                        }
                        nextBatch();
                    };
                    if (task)
                        task(afterTask);
                    else
                        afterTask();
                });
        }, (error) => {
            console.log('eror while performing batch: ', error);
        }));
}