const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

module.exports = (req,res,next) => {
    try{
        let token = req.headers.authorization;
        let finalToken;
        if(token) {
            finalToken = token.split(' ')[1];
        } else {
            throw boom.proxyAuthRequired('Bearer token is required 🐻');
        }
        const decoded = jwt.decode(finalToken,{complete: true});
        req.userData = decoded.payload;
        next();
    } catch(error) {
        throw boom.badRequest(error.message);
    }
} 