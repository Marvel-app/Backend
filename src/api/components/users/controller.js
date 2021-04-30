const bcrypt = require('bcrypt')
const boom = require("@hapi/boom")
const userStore = require("./store")
const token = require("../../../utils/createJwt")
class Controller{

    constructor(){
        this.store = new userStore()
    }

    async createUser(user){
        const userName = user.name;
        const userEmail = user.email 
        let userPassword = user.password

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(userPassword, 10, (err, hash) => {
                if(err) reject(boom.internal(err));
                resolve(hash);
            })
        })
        
        const validateUserName = await this.store.validateUserByFilter({username: userName})
        if(validateUserName) throw boom.conflict("A user with this username already exists");

        const validateUserEmail =  await this.store.validateUserByFilter({email: userEmail})
        if(validateUserEmail) throw boom.conflict("A user with this email already exists");

        const User = {
            username: userName,
            email: userEmail,
            password: hashedPassword
        } 

        const userCrated = await this.store.createUser(User)
        if(!userCrated) throw boom.conflict("There was a problem creating your user");

        return 'User created'
    }

    async validatedUser(user){

        const validateUserName = await this.store.validateUserByFilter({username: user.name})
        if(!validateUserName) throw boom.conflict("User not found");

        const userComp = await this.store.getUserByFilter({username: user.name})
        if(user.password === userComp.password){
            const jwt = token({sub: userComp._id, username: userComp.username, email: userComp.email})
            return jwt
        }else{
            throw boom.conflict("Password does not match");
        }

    }
}

module.exports = Controller