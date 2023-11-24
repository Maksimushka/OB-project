import gulp from 'gulp'

// Config
import path from '../config/path.js'

// Plugins

import browserSync from 'browser-sync'

// Обработка картинок
const publicRoot = () => {
  return (
    gulp
      .src(path.publicRoot.src)
      //   .pipe(
      //     plumber({
      //       errorHandler: notify.onError((error) => ({
      //         title: 'Image',
      //         message: error.message
      //       }))
      //     })
      //   )
      //   .pipe(newer(path.img.dest))
      //   // .pipe(webp())
      //   .pipe(gulp.dest(path.img.dest))
      //   .pipe(gulp.src(path.img.src))
      //   .pipe(newer(path.img.dest))
      //   .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
      .pipe(gulp.dest(path.publicRoot.dest))
      .pipe(browserSync.stream())
  )
}

export default publicRoot
