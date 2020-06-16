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
                            html: '<script class="loadScriptStyle" group="appended" type="text/javascript"></script>'
                        }
                    ],
                    callback: function ($, file) {
                        //获取编译后的脚本，改为惰性加载
                        const src = [];
                        $('body')
                            .find('script[group!="appended"]')
                            .each(function () {
                                src.push($(this)
                                    .attr('src'));
                            })
                            .remove();
                        //获取编译后的样式，改变为惰性加载
                        const sheet = [];
                        $('head')
                            .find('link[rel="stylesheet"]')
                            .each(function () {
                                sheet.push($(this)
                                    .attr('href'));
                            })
                            .remove();

                        $('.loadScriptStyle')
                            .html(`
                                window.onload = function(){
                                        LoadingScript(${JSON.stringify(src)})
                                        LoadingSheet(${JSON.stringify(sheet)})
                                }
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
