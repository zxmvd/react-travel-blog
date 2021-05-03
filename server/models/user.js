const mongoose =  require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }],
    name: String,
	is_male: Boolean,
    passwordHash: String

}) 

userSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)