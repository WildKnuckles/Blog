const {Schema, model} = require('mongoose')


const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    avatar: {type: String},
    posts: {type: Number, default: 0}
})


module.exports = model('User', userSchema)