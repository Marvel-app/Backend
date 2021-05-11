const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}&/);
const firstNameSchema = joi.string().max(80).regex(/^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/).message('That doesnt looks like a valid username, let us stick to letters and numbers, if you think its an error please contact with an administrator.');
const emailSchema = joi.string().max(80).regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).message('That doesnt looks like a valid email');
const passwordSchema = joi.string().min(8).regex(/^(?=.*[a-záéíóúñ])(?=.*[A-ZÁÉÍÓÚÑ])(?=.*[0-9!@#$%^&*?])\S{8,}$/).message('Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number');

const createUserSchema = {
    username: firstNameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required()
};
const userSchema = {
    name: firstNameSchema.required()
}
const logginSchema = {
    username: firstNameSchema.required(),
    password: passwordSchema.required()
}
const updateUserSchema = {
    name: firstNameSchema,
    email: emailSchema,
    password: passwordSchema
}

module.exports = {
    userSchema,
    logginSchema,
    userIdSchema, 
    createUserSchema,
    updateUserSchema,
};