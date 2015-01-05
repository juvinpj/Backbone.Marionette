module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
    dist: {
        files: {
          'build.js': ['app.js'],
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build.js',
        dest: 'build/build.min.js'
      }
    },
    sass : {
      dist : {
        files : {
          'assets/css/custom.css' :  'assets/sass/custom.scss'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).

  grunt.registerTask('default', ['browserify', 'uglify', 'sass']);

};
