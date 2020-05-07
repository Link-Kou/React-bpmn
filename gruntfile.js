module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        dom_munger: {
            build: {
                options: {
                    /*prefix: {
                        selector: 'link',
                        attribute: 'href',
                        value: 'project-name/'
                    },*/
                    remove: '[group="appended"]',
                    append: [
                        {
                            selector: 'head',
                            html: '<link class="loading" href="./loading.css" rel="stylesheet">'
                        },
                        {
                            selector: 'body',
                            html: '<script class="loading" group="appended" type="text/javascript" src="./loading.js"></script>'
                        },
                        {
                            selector: 'body',
                            html: '<script class="loadScript" group="appended" type="text/javascript" ></script>'
                        }
                    ],
                    callback: function ($, file) {
                        //do anything you want here
                        const src = [];
                        $('body')
                            .find('script[group!="appended"]')
                            .each(function () {
                                src.push($(this)
                                    .attr('src'));
                            })
                            .remove();
                        $('.loadScript')
                            .html(`
                               setTimeout(() => {
                                       $script(${JSON.stringify(src)}, function() {
                                        var loadingdoms = document.querySelectorAll('.loading');
                                        for (loadingdom in loadingdoms) {
                                            var node = loadingdoms[loadingdom];
                                            if (node.parentNode) {
                                                node.parentNode.removeChild && node.parentNode.removeChild(node);
                                            }
                                        }
                                    })
                                }, 3500);
                           `);

                    }
                },
                src: './build/index.html' //could be an array of files
                //dest: 'dist/index.html' //optional, if not specified the src file will be overwritten
            }
        },
        copy: {
            build: {
                files: [
                    {
                        cwd: './scripts',
                        dest: './build',
                        expand: true,
                        src: ['**']
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-dom-munger');

    grunt.registerTask('default', [
        'dom_munger'
    ]);
};
