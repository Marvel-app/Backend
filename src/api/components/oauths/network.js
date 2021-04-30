const express = require('express');
const router = express.Router();
//const UserController = require('./controller');
//const Controller = new UserController;
const {logginSchema, createUserSchema, userIdSchema, updateUserSchema } = require('../../../utils/validations/schemas/userExample'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
//const jwt = require("jsonwebtoken")

router.post('/google',validationHandler(createUserSchema),async (req, res, next) => {
    try {
        //const message = await Controller.createUser(req.body)
        res.status(201).json({
            Message: 'done'
        });
    } catch (error) {
        next(error)
    }
})

module.exports = router;