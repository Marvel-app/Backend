const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
    username: String,
    email: {
        type: String,
    },
    password: String,
    favs: [{
        name: String,
        description: String,
    }],


},{
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;