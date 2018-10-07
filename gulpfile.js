const gulp = require('gulp')
const minify = require('gulp-minify')

gulp.task('minify', () => {
	gulp.src('src/*.js')
		.pipe(minify())
		.pipe(gulp.dest('docs/'))
})

gulp.task('default', function() {
	console.log('Hello World')
})