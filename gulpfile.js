const gulp = require('gulp')
const minify = require('gulp-minify')
const cleanCSS = require('gulp-clean-css')

gulp.task('jsToDocs', () => {
	gulp.src('src/medium-sharer.js')
		.pipe(minify({
			noSource: true,
		}))
		.pipe(gulp.dest('docs/scripts'))	
})

gulp.task('cssToDocs', () => {
	gulp.src('src/medium-sharer.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('docs/css'))
})

// Generate minified files for docs
gulp.task('docs', ['cssToDocs', 'jsToDocs'])

gulp.task('buildjs', () => {
	gulp.src('src/medium-sharer.js')
		.pipe(minify())
		.pipe(gulp.dest('dist'))
})

gulp.task('buildcss', () => {
	gulp.src('src/medium-sharer.css')
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist'))
})

// Generate minified files for production(dist folder)
gulp.task('build', ['buildjs', 'buildcss'])


gulp.task('default', function() {
	console.log('Hello World')
})