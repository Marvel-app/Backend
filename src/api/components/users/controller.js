const bcrypt = require('bcrypt')
const boom = require("@hapi/boom")
const userStore = require("./store")
const token = require("../../../utils/createJwt")
class Controller{

    constructor(){
        this.store = new userStore
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
        
        const validateUserName = await this.store.validateUserByName({username: userName})
        if(validateUserName) throw boom.conflict("A user with this username already exists");
        console.log(validateUserName)
        const validateUserEmail =  await this.store.validateUserByEmail({email: userEmail})
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

        const validateUserUsername = await this.store.validateUserByName({username: user.username})
        if(!validateUserUsername) throw boom.conflict("User not found");

        const userComp = await this.store.getUserByName({username: user.username})

        const result = await bcrypt.compare(user.password, userComp.password)

        if(result){
            const jwt = token(userComp)
            return jwt
        }else{
            throw boom.conflict("Password does not match");
        } 

    }

    async   getFavorites(userData){
        const validateUserID = await this.store.validateUserByID({_id: userData.sub})
        if(!validateUserID) throw boom.conflict("User not found");

        const userComp = await this.store.getUserByID(userData.sub)
        
        return userComp.favs

    }

    async addFavorites(_id,fav){
        const validateUserID = await this.store.validateUserByID({_id: _id})
        if(!validateUserID) throw boom.conflict("User not found");

        const userComp = await this.store.getUserByID(_id)

        userComp.favs.forEach(element => {
            fav.forEach(entry => {
                if(element.title === entry.title){
                    throw boom.conflict("This comic is already in your favorites"); 
                }
            });
        });

        fav.forEach(element => {
            userComp.favs.push(element)
        });

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

    async deleteFavorites(_id,fav){
        
        if(fav.length === 0)throw boom.conflict("You didn't send any comics to be removed"); 
        const validateUserID = await this.store.validateUserByID({_id: _id})
        if(!validateUserID) throw boom.conflict("User not found");

        const userComp = await this.store.getUserByID(_id)


            fav.forEach(entry => {
                userComp.favs = userComp.favs.filter(e => e.title !== entry.title)
            });

        if(userComp.password){

            let updatedUser = {
                username: userComp.username,
                email: userComp.email,
                password: userComp.password,
                favs: userComp.favs
            }
            const update = await this.store.updateUser({_id: userComp._id },updatedUser)
            if(!update) throw boom.conflict("Somethong went worng while updating your profile"); 
            return "Comic removed"

        } else {

            let updatedUser = {
                username: userComp.username,
                email: userComp.email,
                favs: userComp.favs
            }
            const update = await this.store.updateUser({_id: userComp._id },updatedUser)
            if(!update) throw boom.conflict("Somethong went worng while updating your profile"); 
            return "Comic removed"

        }
        
        

    }
}

module.exports = Controller