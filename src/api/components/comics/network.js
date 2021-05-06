const express = require('express');
const router = express.Router();
const UserController = require('./controller');
const Controller = new UserController;
//const {logginSchema, createUserSchema, userSchema} = require('../../../utils/validations/schemas/userExample'); // eslint-disable-line
//const validationHandler = require('../../../utils/middlewares/validationHandler');
const checkJWT = require('../../../utils/middlewares/auth/checkJwt')



router.get('/',checkJWT, async (req, res, next) => {
    try {
        const { heroname } = req.query
        const { numberComics } = req.query
        const info = await Controller.getComicsByName(heroname,numberComics)
        res.status(200).json({
            ...info
        });
    } catch (error) {
        next(error)
    }
})


router.get('/randoms',checkJWT, async (req, res, next) => {
    try {
        const { numberComics } = req.query
        const info = await Controller.getRandomsComics(numberComics)
        res.status(200).json({
            ...info
        });
    } catch (error) {
        next(error)
    }
})




module.exports = router;