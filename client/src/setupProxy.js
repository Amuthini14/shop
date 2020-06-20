//configure proxy
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000', //bcz the server port is 5000
            changeOrigin: true,
        })
    );
};

// Passing the path to the proxy function allows  to use globbing and/or pattern matching on the path,
// which is more flexible than the express route matching.