module.exports = function(grunt) {
    grunt.initConfig({
        "copy": {
          build: {
            cwd: 'source',
            src: [ '**' ],
            dest: 'build',
            expand: true
          },
        },

        "clean": {
          build: {
            src: [ 'build' ]
          },
        },

        "stylus": {
          build: {
            options: {
              linenos: true,
              compress: false
            },
            files: [{
              expand: true,
              cwd: 'source',
              src: [ '**/*.styl' ],
              dest: 'build',
              ext: '.css'
            }]
          }
        },

        "autoprefixer": {
          build: {
            expand: true,
            cwd: 'build',
            src: [ '**/*.css' ],
            dest: 'build'
          }
        },

        "uglify": {
          build: {
            options: {
              mangle: false
            },
            files: {
              'build/application.js': [ 'build/**/*.js' ]
            }
          }
        },

        "bower-install-simple": {
            options: {
                color: true,
                directory: "bower_components"
            },
            "prod": {
                options: {
                    production: true
                }
            },
            "dev": {
                options: {
                    production: false
                }
            }
        },
        "concat": {
            phaser: {
                files: {
                    'build/js/lib/phaser/phaser.js': ['bower_components/phaser-official/build/phaser.js'],
                    'build/js/lib/phaser/phaser.map': ['bower_components/phaser-official/build/phaser.map']
                }
            },
            requirejs: {
                files: {
                    'build/js/lib/requirejs/require.js': ['bower_components/requirejs/require.js']
                }
            },
            jquery: {
                files: {
                    'build/js/lib/jquery/jquery.js': ['bower_components/jquery/dist/jquery.js']
                }
            }
        },
        "jshint": {
            files: ['Gruntfile.js', 'build/js/app/**/*.js'],
            options: {
                globals: {
                    jQuery: false
                }
            }
        },
        "connect": {
            build: {
                options: {
                    port: 8000,
                    base: 'build',
                    keepalive: true
                }
            },
            deploy: {
                options: {
                    port: 8001,
                    base: 'deploy',
                    keepalive: true
                }
            }
        },
        "requirejs": {
            compile: {
                options: {
                    dir: "deploy",
                    appDir: "build",
                    optimize: "uglify",
                    fileExclusionRegExp: /^assets$/ // ignore assets directory, imagemin will handle this instead
                }
            }
        },
        "imagemin": {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                        {
                        expand: true,
                        cwd: 'build/assets/',
                        src: ['**/*.png'],
                        dest: 'deploy/assets/',
                        ext: '.png'
                    }
                ]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/assets/',
                        src: ['**/*.jpg'],
                        dest: 'deploy/assets/',
                        ext: '.jpg'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-cordova-cli');
    // Bower integration

    grunt.registerTask(
      'build',
      'Compiles all of the assets and copies the files to the build directory.',
      [ 'clean', 'copy' ]
    );

    grunt.registerTask('bower', [
      "build",
      'bower-install-simple',
      'concat'
    ]);

    // Web Servers
    grunt.registerTask('server-dev', ['bower', 'connect:build']);
    grunt.registerTask('server-prod', ['connect:deploy']);
    grunt.registerTask('server', ['server-dev']);

    grunt.registerTask('deploy', ['jshint', 'bower', 'requirejs', 'imagemin']);
    grunt.registerTask('default', ['jshint']);
};
