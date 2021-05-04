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
        return user[0]
    }

    async getUserByID(id){
        const user = await this.model.findById(id)
        return user

    }
    

    async updateUser(filter,update){
        await this.model.findOneAndUpdate(filter, update, {new: true});
        return 'Comic added to your favorites'
    }
}

module.exports = Store