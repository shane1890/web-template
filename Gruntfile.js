module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['public'],

        requirejs: {
            compile: {
                options: {
                    optimize: 'none',
                    baseUrl: 'webapp/js',
                    name: 'app.js',
                    out: 'public/js/application.js'
                }
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    processName: function (filePath) {
                        // webapp/templates/path/to/template.handlebars -> path/to/template
                        return filePath.replace('webapp/templates/', '').replace('.handlebars', '')
                    }
                },
                files: {
                    'public/js/templates.js': [
                        'webapp/templates/**/*.handlebars'
                    ]
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            app: {
                src: [
                    'public/js/templates.js',
                    'public/js/application.js'
                ],
                dest: 'public/js/app.js'
            },
            deps: {
                src: [
                    'bower_components/lodash/lodash.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/backbone/backbone.js',
                    'bower_components/handlebars/handlebars.runtime.js',
                    'bower_components/requirejs/require.js'
                ],
                dest: 'public/js/deps.js'
            }
        },

        uglify: {
            app: {
                files: {
                    'public/js/deps.min.js': [
                        'public/js/deps.js'
                    ],
                    'public/js/app.min.js': [
                        'public/js/app.js'
                    ]
                }
            }
        },

        copy: {
            html: {
                expand: true,
                cwd: 'webapp/html',
                src: '**',
                dest: 'public'
            },
            images: {
                expand: true,
                cwd: 'webapp/img',
                src: '**',
                dest: 'public/img'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'public/css/app.min.css': 'webapp/scss/app.scss'
                }
            }
        },

        mocha: {
            test: {
                src: ['tests/**/*.html'],
                dest: './test/output/xunit.out',
                options: {
                    log: true,
                    run: true,
                    logErrors: true,
                    reporter: 'XUnit',
                    webSecurityEnabled: false
                }
            }
        },

        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['build']
            },
            copy: {
                files: ['webapp/img/**', 'webapp/html/**'],
                tasks: ['copy']
            },
            handlebars: {
                files: ['webapp/templates/**/*.handlebars'],
                tasks: ['handlebars', 'concat', 'uglify']
            },
            sass: {
                files: ['webapp/scss/**'],
                tasks: ['sass']
            },
            javascript: {
                files: ['webapp/js/**', 'tests/js/**'],
                tasks: ['requirejs', 'concat', 'uglify', 'mocha']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.registerTask('build', ['clean', 'requirejs', 'handlebars', 'concat', 'uglify', 'sass', 'copy', 'mocha']);
    grunt.registerTask('default', ['build', 'watch']);
};
