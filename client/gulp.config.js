'use strict';

module.exports = {
  lintScripts: [
    './gulpfile.js',
    './gulp_tasks/*.js',
    './app/app.js',
    './app/run.js',
    './app/config.js',
    './app/atm/atm.js',
    './app/**/*.module.js',
    './app/**/*.controller.js',
    './app/**/*.directive.js',
    './app/**/*.service.js',
    './app/**/*.factory.js',
    './app/**/*.filter.js'
  ],
  uglify: {
    compress: true,
    mangle: true,
    preserveComments: 'license'
  },
  cssOptions: {
    processImport: false
  },
  gzip: {
    append: true,
    preExtension: 'gz',
    gzipOptions: { level: 9 }
  },
  templates: {
    src: ['./app/**/*.html'],
    dest: './public/app'
  },
  images: {
    src: ['./public/images/**/*'],
    dest: './public/images'
  },
  scripts: {
    src: [
      './app/app.js',
      './app/config.js',
      './app/run.js',
      './app/atm/atm.js',  
      './app/**/*.module.js',    
      './app/**/*.config.js',
      './app/**/*.controller.js',

      './app/**/*.directive.js',
      './app/**/*.factory.js',
      './app/**/*.service.js',
      './app/templates.js'
    ],
    dest: './public/js',
    output: 'app.min.js'
  }
};