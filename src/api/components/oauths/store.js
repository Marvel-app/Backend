const userModel = require('../../../db/models/users');

class Store{
    constructor(){
        this.model = userModel
    }

    async createUser(user){
        const created = await this.model.create(user)
        created.save()
        return created
    }

    async validateUserByFilter(filter){
        const user = await this.model.find(filter)

        if(user[0]){
            return true
        }else{
            return false
        }

    }

    async getUserByFilter(filter){
        const user = await this.model.find(filter)
        return user
    }
}

module.exports = Store