const express = require('express');
const router = express.Router();
const UserController = require('./controller');
const Controller = new UserController();
const {logginSchema, createUserSchema, userSchema} = require('../../../utils/validations/schemas/userExample'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const checkJWT = require('../../../utils/middlewares/auth/checkJwt')
const refreshJWT = require('../../../utils/middlewares/auth/refreshJWT')
const token = require('../../../utils/createJwt')

router.post('/register',validationHandler(createUserSchema),async (req, res, next) => {
    try {
        const message = await Controller.createUser(req.body)
        res.status(201).json({
            Message: message
        });
    } catch (error) {
        next(error)
    }
})

router.post('/login',validationHandler(logginSchema), async(req, res, next) => {
    try {
        const jwt = await Controller.validatedUser(req.body)
        res.status(200).json({
            jwt: jwt
        });
    } catch (error) {
        next(error)
    }
})

router.get('/favorites',checkJWT, async (req, res, next) => {
    try {
        const { userData } = req;
        const favorites = await Controller.getFavorites(userData)
        res.status(200).json({
            favorites
        });
    } catch (error) {
        next(error)
    }
})

router.post('/favorites',checkJWT, async (req, res, next) => {
    try {
        const _id = req.userData.sub;
        const fav = req.body.fav;
        const added = await Controller.addFavorites(_id,fav)
        res.status(200).json({
            added
        });
    } catch (error) {
        next(error)
    }
})

router.get('/refresh',refreshJWT, async (req, res, next) => {
    try {
        const { userData } = req;
        const jwt = token(userData)
        res.status(200).json({
            jwt
        });
    } catch (error) {
        next(error)
    }
})




module.exports = router;