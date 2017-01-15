'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        reporterOutput: ""
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },
      js: {
        src: ['*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    ava: {
      test: ['./test/*.js'],
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      js: {
        files: ['./lib/**/*.js', '*.js'],
        tasks: ['jshint:js', 'ava']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'ava']
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'ava']);
};
