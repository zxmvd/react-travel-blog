const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  user:{
	  username:String,
    id:{type: mongoose.Schema.Types.ObjectId,
    ref: 'User'}
  },
	blog:{
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Blog'
	},
  likes: Number,
  date:Date
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)
