var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('build-ts', function() {
    var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
    return gulp.src(path.resolve('./**/*.ts'))
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest(path.resolve('./')))
});

gulp.task('default', function(){

    gulp.watch('**/*.ts', ['build-ts']);
});