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
                            selector: 'body',
                            html: '<script class="loading" group="appended" type="text/javascript" src="./indexAnimationLoading.js"></script>'
                        },
                        {
                            selector: 'body',
                            html: '<script class="loading" group="appended" type="text/javascript" src="./indexAsynloading.js"></script>'
                        },
                        {
                            selector: 'body',
                            html: '<script class="loadScript" group="appended" type="text/javascript"></script>'
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
                            window.onload = AnimationLoading(${JSON.stringify(src)})
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
        'dom_munger',
        'copy'
    ]);
};
