const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/callback/*', { target: 'http://localhost:5000' }))
   // app.use(proxy('/api/*', { target: 'http://localhost:5000' }))
}


//to make requests from our frontend to our backend application.