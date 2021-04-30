const express = require('express');
const router = express.Router();
const UserController = require('./controller');
const Controller = new UserController;
const {logginSchema, createUserSchema, userIdSchema, updateUserSchema } = require('../../../utils/validations/schemas/userExample'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');

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

router.post('/loggin',validationHandler(logginSchema), async(req, res, next) => {
    try {
        const jwt = await Controller.validatedUser(req.body)
        res.status(200).json({
            jwt: jwt
        });
    } catch (error) {
        next(error)
    }
})


module.exports = router;