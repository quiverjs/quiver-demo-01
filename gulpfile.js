var gulp = require('gulp')
var traceur = require('gulp-traceur')

gulp.task('default', ['src.es5'])

var traceurOptions = { 
  symbols: true
}

gulp.task('src.es5', function () {
  return gulp.src('src/*/*.js')
    .pipe(traceur(traceurOptions))
    .pipe(gulp.dest('es5'));
})
