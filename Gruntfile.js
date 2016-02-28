module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['node_modules/foundation-sites/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true,
        },
        files: {
          'public/css/app.css': 'src/scss/application.scss'
        }
      }
    },

    concat: {
      options: {
        //separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
      },
      dist: {
        src: [
          "node_modules/jquery/dist/jquery.min.js",
          "node_modules/foundation-sites/dist/foundation.min.js",
          "node_modules/jquery-minicolors/jquery.minicolors.js",
          "src/js/**.js"
        ],
        dest: 'public/js/app.js',
      },
      css: {
        src: ['public/css/app.css', "node_modules/jquery-minicolors/jquery.minicolors.css"],
        dest: 'public/css/app.css',
      }
    },

    clean: {
        css: ['public/css/app.css']
    },

    copy: {
      main: {
        src: 'node_modules/jquery-minicolors/jquery.minicolors.png',
        dest: 'img/jquery.minicolors.png',
      },
    },

    jshint:{
      files: ['Gruntfile.js', 'server.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      options: {
        // Override defaults here
        livereload: true
      },

      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },

      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'concat'],
        options: {
          interrupt: true,
        },
      },

      sass: {
        files: 'src/**/*.scss',
        tasks: ['public']
      }
    },

    express: {
      options: {
        // Override defaults here
        livereload: true
      },
      dev: {
        options: {
          script: 'server.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('public', ['clean', 'sass', 'concat']);
  grunt.registerTask('build', ['public', 'copy', 'jshint', 'mochaTest']);
  grunt.registerTask('default', ['build','watch']);
  grunt.registerTask('dev', ['build', 'express', 'watch']);
};
