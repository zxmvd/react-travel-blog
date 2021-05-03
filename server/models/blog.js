const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
	comments:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
	
  content: String,
//	author_is_male: Boolean,
  imgUrl: [{type:String}],
  date: Date,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
//	returnedObject.date = returnedObject.date.toISOString().split("T")[0]
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
