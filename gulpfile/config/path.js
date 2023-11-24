const pathSrc = './src'
const pathDest = './public'

export default {
  root: pathDest,

  html: {
    src: pathSrc + '/html/*.njk',
    watch: pathSrc + '/html/**/*.njk',
    dest: pathDest
  },

  pug: {
    src: pathSrc + '/pug/*.pug',
    watch: pathSrc + '/pug/**/*.pug',
    dest: pathDest
  },

  css: {
    src: pathSrc + '/css/*.css',
    watch: pathSrc + '/css/**/*.css',
    dest: pathDest + '/css'
  },

  scss: {
    src: pathSrc + '/sass/*.{sass,scss}',
    watch: pathSrc + '/sass/**/*.{sass,scss}',
    dest: pathDest + '/css'
  },

  js: {
    src: pathSrc + '/js/*.js',
    watch: pathSrc + '/js/**/*.js',
    dest: pathDest + '/js'
  },

  img: {
    src: [
      pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg}',
      `!${pathSrc}/img/svg/**/*.svg`
    ],
    watch: [
      pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg}',
      `!${pathSrc}/img/svg/**/*.svg`
    ],
    dest: pathDest + '/img'
  },

  font: {
    src: pathSrc + '/font/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
    watch: pathSrc + '/font/**/*.{eot,ttf,otf,otc,ttc,woff,woff2,svg}',
    dest: pathDest + '/font'
  },

  sprite: {
    src: pathSrc + '/img/svg',
    watch: pathSrc + '/img/svg/**/*.svg',
    dest: pathDest + '/img/svg'
  },

  assets: {
    src: pathSrc + '/assets/**/*.pdf',
    watch: pathSrc + '/assets/*.pdf',
    dest: pathDest + '/assets'
  },
  publicRoot: {
    src: [
      pathSrc + '/public_root/**/_redirects',
      pathSrc + '/public_root/**/*.txt'
    ],
    watch: [
      pathSrc + '/public_root/**/_redirects',
      pathSrc + '/public_root/**/*.txt'
    ],
    dest: pathDest + '/'
  }
}
