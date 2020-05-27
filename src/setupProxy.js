const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', proxy({
        target: 'http://1.w2wz.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            '^/api': ''
        }
    }));
    app.use('/upload', proxy({
        target: 'http://1.w2wz.com',
        //改变源
        changeOrigin: true
        /*secure: false,
        pathRewrite: {
            '^/upload': '/'
        }*/
    }));
    app.use('/dev', proxy({
        target: 'http://localhost:8080',
        //改变源
        changeOrigin: true,
        secure: false,
        /**
         * 重定向
         */
        pathRewrite: {
            '^/dev': ''
        }
    }));
};
