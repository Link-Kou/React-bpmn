const {override, addLessLoader, addWebpackAlias, addWebpackModuleRule} = require('customize-cra');
const markdownRenderer = require('react-markdown-reader').renderer;

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
    addWebpackAlias({
        '@http': 'src/redux/fetch',
        '@imageManager': 'src/component/imageManager',
        '@utils': 'src/component/utils',
        '@component': 'src/component',
        '@common': 'src/common',
        '@router': 'src/router',
        '@fetch': 'src/fetch'
    })
);
