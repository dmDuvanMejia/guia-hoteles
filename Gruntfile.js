module.exports = function(grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },

        watch:{
            files:['css/*.scss'],
            tasks:['css']
        },

        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },            
                options:{
                    watchTask: true,
                    server:{
                        baseDir:'./'
                    }
                }                
            }       
        },

        imagemin:{
            dist:{
                files:[
                    {
                        expand:true,
                        cwd: './',
                        src: 'images/*.{png,gif,jpg,jpge}',
                        dest: 'dist/'
                    }
                ]
            }
        },

        clean:{
            build:{
                src:['dist/']
            }
        },

        copy:{
            html:{
                files:[{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src:['*.html'],
                    dest: 'dist'
                }]
            },
            
            fonts: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/open-iconic/font',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }
            ]
        }

        },

        cssmin:{
            dist:{}
        },

        uglify:{
            dist:{}
        },

        filerev:{
            options:{
                encoding:'utf8',
                algorithm:'md5',
                length:20
            },
            release:{
                files:[{
                    src:[
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },

        useminPrepare:{
            foo:{
                dest:'dist',
                src:['index.html','precios.html','contacto.html', 'about.html']
            },
            options:{
                flow:{
                    steps:{
                        css:['cssmin'],
                        js:['uglify']
                    },
                    post:{
                        css:[{
                            name:'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments:0,
                                    rebase:false
                                }
                            }
                        }]
                    }
                }
            }
        },

        usemin:{
            html:[
                'dist/index.html',
                'dist/precios.html',
                'dist/contacto.html',
                'dist/about.html'
            ],
            options:{
                assetsDir:[
                    'dist',
                    'dist/css',
                    'dist/js'
                ]
            }
        },

        concat:{
            options:{
                separator:';'
            },
            dist:{}
        },

        

    });

    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync','watch']);
    grunt.registerTask('images:compress', ['imagemin']);
    grunt.registerTask('build', [
          'clean',
          'copy',
          'imagemin',
          'useminPrepare',
          'concat',
          'cssmin',
          'uglify',
          'filerev',
          'usemin'
        ]);

};