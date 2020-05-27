const {override, addLessLoader, addWebpackAlias, addWebpackModuleRule} = require('customize-cra');
const markdownRenderer = require('react-markdown-reader').renderer;
const path = require('path');

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@icon-font-path': './fonts',
            '@input-color-disabled': '#404040',
            '@table-head-font-color': '#5c5c5c',
            '@base-color': '#2962A5'
        }
    }),
    addWebpackModuleRule({
        test: /\.md$/,
        use: [{
            loader: 'html-loader'
        }, {
            loader: 'markdown-loader',
            options: {
                renderer: markdownRenderer(['javascript', 'bash', 'xml', 'css', 'markdown', 'less'])
            }
        }]
    }),
    addWebpackModuleRule({
        test: /\.svg$/,
        include: path.resolve(__dirname, './src/resource/svg/'),
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            'svg-transform-loader',
            'svgo-loader'
        ]
    }),
    addWebpackAlias({
        '@http': 'src/redux/fetch',
        '@imageManager': 'src/component/imageManager',
        '@utils': 'src/component/utils',
        '@component': 'src/component',
        '@resource': 'src/resource',
        '@common': 'src/common',
        '@router': 'src/router',
        '@listener': 'src/listener',
        '@fetch': 'src/fetch'
    })
);
