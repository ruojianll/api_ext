var gulp = require('gulp');
var bro = require('gulp-bro');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
gulp.task('default',function(){
	gulp.watch(['./dev/**/*.js','./dev/**/*.css'],function(){
		gulp.src('./dev/api-ext.js')
			.pipe(bro())
			.pipe(gulp.dest('./app/script/'))
			.pipe(gulp.dest('./pro/'))
			.pipe(uglify())
			.pipe(rename({suffix:'.min'}))
			.pipe(gulp.dest('./pro/'));
		gulp.src('./dev/**/*.css')
			.pipe(gulp.dest('./app/css/'))
			.pipe(gulp.dest('./pro/'));
		console.log('Finish.')
	});
});
