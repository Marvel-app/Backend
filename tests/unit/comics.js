const UserController = require('../../src/api/components/users/controller')
//const userStore = require("../../src/utils/mocks/users")
const Controller = new UserController

const funcioncita = async () => {
    const message = await Controller.createUser({
        username: "test",
        email: "test@test.com",
        password: "P4ssword"
    })

    if(message !== 'User created'){
        return message
    } else {
        return "chido"
    }

}

console.log(funcioncita())    