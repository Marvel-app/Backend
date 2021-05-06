const mockDB = []
const randstring = require("../oauths/general")
class Store{
    constructor(){
    }

    async createUser(user){
 
        user._id = randstring(10)
        mockDB.push(user)
        return user
    }

    async validateUserByName(filter){
        const { username } = filter
        const [user] = mockDB.filter(entry => entry.username === username)

        return user

    }

    async validateUserByEmail(filter){
        const { email } = filter
        const [user] = mockDB.filter(entry => entry.email === email)

        return user

    }

    async validateUserByID(filter){
        const { _id } = filter
        const [user] = mockDB.filter(entry => entry._id === _id)

        return user

    }

    async getUserByName(filter){
        const { username } = filter
        const [user] = mockDB.filter(entry => entry.username === username)

        return user

    }

    async getUserByID(id){
        const [user] = mockDB.filter(entry => entry._id === id)
        return user

    }
    

    async updateUser(filter,update){
        const { _id } = filter
        const index = mockDB.findIndex(element => element._id == _id)
        mockDB[index] = update
        return "comic added to your favorites"

    }
}

module.exports = Store