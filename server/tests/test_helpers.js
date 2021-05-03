const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const initialNotes = [
//   {
//     content: 'HTML is easy',
//     important: false
//   },
//   {
//     content: 'Browser can execute only Javascript',
//     important: true
//   }
// ]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
//   the id of each blog retrived from db is object format originally
  console.log('allllllllllllllll', typeof blogs[0]._id)
//   call toJSON method of each blog to turn the object into json format
  return blogs.map(blog => blog.toJSON())
}

const newUserToken = async () => {
  const newUser = new User({
    username: 'test_user',
    password: 'testuser',
    name: 'Test User the Third'
  })
  const result = await newUser.save()
  const token = await jwt.sign({
    username: result.username,
    id: result.id
  }, process.env.SECRET)
  return token
}

module.exports = {
  nonExistingId, blogsInDb, newUserToken
}