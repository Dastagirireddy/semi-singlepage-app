var path = require('path');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var tsConfig = require('./tsconfig.json');

gulp.task('client-build-ts', function() {

    var ts = require('gulp-typescript');
    var tsProject = ts.createProject('./src/client/tsconfig.json');
    return gulp.src(['./src/client/dev/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/client/app'));
});

function buildTs(pathName, folderName) {

    var ts = require('gulp-typescript');
    var tsProject = ts.createProject(tsConfig.server);
    return gulp.src(path.resolve(pathName))
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest(path.resolve(folderName)));
}

gulp.task('server-bin-build-ts', function(){

    return buildTs('./bin/**/*.ts', './bin/');
});

gulp.task('server-src-build-ts', function() {
    
    return buildTs('./src/server/**/*.ts', './src/server/');
});

gulp.task('default', function(){

    gulp.watch('**/*.ts', ['client-build-ts', 'server-bin-build-ts', 'server-src-build-ts']);
});