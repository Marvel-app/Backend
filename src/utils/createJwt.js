const { config } = require('../config/index');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const token = jwt.sign({
        sub: user._id,
        username: user.username,
        email: user.email
    }, config.jwt_secret, {
        expiresIn: '15m'
    })

    return token;
}

module.exports =     createToken
