const express = require('express');
const router = express.Router();
const controller = require('./controller');
const generateUrl = require('../../../utils/oauths/google');

router.get('/google', async (req, res,next) => {
    try{
        const uri = await generateUrl();
        res.redirect(uri);
    } catch (error){
        next(error)
    }

})

router.get('/register', async (req, res, next) => {
    try {
        const userData = await controller.getTokens(req.query.code);
        const token = await controller.validateUser(userData)
        res.redirect('https://marvelapp-frontend.vercel.app/home')
        res.status(200).json({
            jwt: token
        })
    } catch (error) {
        next(error)
    }

})
module.exports = router;