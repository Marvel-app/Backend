const bcrypt = require('bcrypt')
const boom = require("@hapi/boom")
const userStore = require("./store")
const token = require("../../../utils/createJwt")
class Controller{

    constructor(){
        this.store = new userStore()
    }

    async createUser(user){
        const userName = user.username;
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

        const validateUserEmail = await this.store.validateUserByFilter({email: user.email})
        if(!validateUserEmail) throw boom.conflict("User not found");

        const userComp = await this.store.getUserByFilter({email: user.email})

        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(user.password, 10, (err, hash) => {
                if(err) reject(boom.internal(err));
                resolve(hash);
            })
        })

        if(hashedPassword === userComp.password){
            const jwt = token({sub: userComp._id, username: userComp.username, email: userComp.email})
            return jwt
        }else{
            throw boom.conflict("Password does not match");
        } 

    }

    async getFavorites(userData){
        const validateUserID = await this.store.validateUserByFilter({_id: userData.sub})
        if(!validateUserID) throw boom.conflict("User not found");

        const userComp = await this.store.getUserByID(userData.sub)
        
        return userComp.favs

    }

    async addFavorites(_id,fav){
        const validateUserID = await this.store.validateUserByFilter({_id: _id})
        if(!validateUserID) throw boom.conflict("User not found");

        const userComp = await this.store.getUserByID(_id)

        userComp.favs.forEach(element => {
            if(element.name === fav.name){
                throw boom.conflict("This comic is already in your favorites"); 
            }
        });

        userComp.favs.push(fav)

        if(userComp.password){

            let updatedUser = {
                username: userComp.username,
                email: userComp.email,
                password: userComp.password,
                favs: userComp.favs
            }
            const added = await this.store.updateUser({_id: userComp._id },updatedUser)
            return added

        } else {

            let updatedUser = {
                username: userComp.username,
                email: userComp.email,
                favs: userComp.favs
            }
            const added = await this.store.updateUser({_id: userComp._id },updatedUser)
            return added

        }
        
        

    }
}

module.exports = Controller