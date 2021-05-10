const UserController = require('../../src/api/components/users/controller')
const userStore = require("../../src/utils/mocks/users")
const Controller = new UserController(userStore)

const validacion1 = async () => {
    const crear = await Controller.createUser({
        username: "a ver",
        password: "a ver",
        email: "a ver"
    })
    return crear
}

console.log(validacion1())
console.log("############")
/*
const validacion2 = async () => {
    const valid = await Controller.validatedUser({
        username: "a ver",
        password: "a ver",
        email: "a ver"
    })
    return valid
}

console.log(validacion2())
*/