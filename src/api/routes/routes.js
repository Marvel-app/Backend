const userRoutes = require('../components/users/network');
const oauthRoutes = require('../components/oauths/network')
const routes = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/oauth', oauthRoutes);
}

module.exports = routes;