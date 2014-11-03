 module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/lib/*.js','js/src/*.js'],
        dest: 'js/build/<%= pkg.name %>.min.js'
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
        tasks: ['sass']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', [
    'watch',
    'concat',
    'sass'
    //, 'uglify'
  ]);

};