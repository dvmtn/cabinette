 module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'js/bookends/pre.js',
          'js/lib/jquery.js',
          'js/lib/*.js',
          'js/src/*.js',
          'js/bookends/post.js'
        ],
        dest: 'js/build/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: 'js/build/cabinette.min.js',
      options:{
        specs: 'specs/*'
      }
    },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   dist: {
    //     files: {
    //       'js/build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //     }
    //   }
    // },
    sass: {
      dist: {
        files: {
          'css/build/<%= pkg.name %>.min.css' : 'css/src/base.scss'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'js/src/**/*.js', 'spec/**/*.js'],
      beforeconcat: ['js/src/*.js', 'specs/*.js']
    },
    watch: {
      js:{
        files: ['js/src/*.js'],
        tasks: [
          'concat'
          //,'uglify'
        ]
      },
      css: {
        files: 'css/src/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true,
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', [
    'watch',
    'concat',
    'sass'
    //, 'uglify'
  ]);

  grunt.registerTask('test', [
    'jasmine'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'jasmine',
    'concat'
  ]);

};
