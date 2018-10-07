const gulp = require('gulp')
const minify = require('gulp-minify')
const cleanCSS = require('gulp-clean-css')

gulp.task('jsToDocs', () => {
	gulp.src('src/medium-sharer.js')
		.pipe(minify({
			noSource: true,
		}))
		.pipe(gulp.dest('docs'))	
})

gulp.task('cssToDocs', () => {
	gulp.src('src/medium-sharer.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('docs/medium-sharer-min.css'))
})

gulp.task('docs', ['cssToDocs', 'jsToDocs'])

gulp.task('build', () => {
	gulp.src('src/*.js')
		.pipe(minify())
		.pipe(gulp.dest('dist'))
})

gulp.task('default', function() {
	console.log('Hello World')
})