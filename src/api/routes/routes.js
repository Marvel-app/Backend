const userRoutes = require('../components/users/network');
const oauthRoutes = require('../components/oauths/network')
const comicsRoutes = require('../components/comics/network')
const routes = (app) => {
    app.use('/api/user', userRoutes);
    app.use('/api/oauth', oauthRoutes);
    app.use('/api/comics',comicsRoutes);
}

module.exports = routes;