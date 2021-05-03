const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1, is_male:1})
  response.json(blogs)
    // console.log('blog11111111111111111', blogs[0])
  })


// blogsRouter.get('/', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs.map(blog=>blog.toJSON()))
//     })
// })

blogsRouter.get('/:id', async (request, response) => {
  // Blog
  //   .findById(request.params.id)
  //   .then(blog => {
  //     response.json(blog)
  //   })
  //   .catch(error=> next(error))

  const blog = await Blog.findById(request.params.id).populate(['comments', 'user'])
  response.json(blog)
  console.log('blogggggggggggggggg comment',blog.comments)
})


blogsRouter.get('/:id/comments', async (request, response) => {
  // Blog
  //   .findById(request.params.id)
  //   .then(blog => {
  //     response.json(blog)
  //   })
  //   .catch(error=> next(error))

  const comments = await Comment.find({blog:request.params.id})
  response.json(comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const comment = new Comment ({
	  content: body.content,
	  user:body.user,
	  blog: body.blog,
    likes: body.likes || 0,
    date: new Date().toISOString().split("T")[0]
  })
  
  
  const savedComment = await comment.save()
  console.log(savedComment.id)
	console.log(typeof(savedComment._id))
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(savedComment)
blog.save()
  response.status(201).json(savedComment)
	
	
	
  

})

blogsRouter.put('/:blogId/comments/:commentId', async (request, response) => {

  const body = request.body
  const comment = {
    content: body.content,
    user: body.user,
    blog: body.blog,
    likes: body.likes
  }
  const updatedComment = await Comment.findByIdAndUpdate(request.params.commentId, comment, {new: true})
  console.log(updatedComment)
  response.json(updatedComment).status(200)
})

blogsRouter.put('/:id', async (request, response) => {
  // Blog
  //   .findById(request.params.id)
  //   .then(blog => {
  //     response.json(blog)
  //   })
  //   .catch(error=> next(error))
  const body = request.body
  const blog = {
    // title: body.title,
    // url: body.url,
    // author: body.author,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', {username:1, name:1, id:1, is_male:1})
  console.log(updatedBlog)
  response.json(updatedBlog).status(200)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({"error": 'invalid token'})
  }

  const user = await User.findById(decodedToken.id)

//const urls=body.imgUrl.split(",")

  const blog = new Blog({
    title: request.body.title,
    imgUrl: body.imgUrl,
    content: request.body.content,
//	author_is_male: (Math.random() + 0.5)>1? true:false,
    likes: request.body.likes || 0,
    user: user._id,
    date: new Date()
  })
  
  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })
  //   .catch(error=> next(error))
  const savedBlog = await blog.save()
  const blogToReturn = await Blog.findById(savedBlog.id).populate('user', {username:1, name:1, id:1, is_male:1})
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(blogToReturn)

})

blogsRouter.delete('/:id', async (request, response) => {

  // if (!req.token)
  //   return res.status(401).json({
  //     error: 'User must be signed in to perform this action',
  //   });

  // const decodedToken = jwt.verify(req.token, process.env.SECRET);

  // let blog = await Blog.findById(req.params.id);

  // // console.log(blog.user.toString() === decodedToken.id);
  // if (blog.user.toString() !== decodedToken.id)
  //   return res
  //     .status(401)
  //     .json({ error: 'User is unauthorized to access this route' });

  // await blog.remove();

  // res.status(200).json({ message: 'Blog has been removed' });

  const bolgToDelete = await Blog.findById(request.params.id)

  if (!bolgToDelete) {
    return response.status(404).send("blog not available")
  }
  const userId = bolgToDelete.user.toString()
  console.log('userId', userId)
  console.log(typeof userId)
  const decodedToken = await jwt.verify(request.token, process.env.SECRET)
  console.log(typeof decodedToken.id)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({"error": 'invalid token'})
  }

  if (decodedToken.id !== userId) {
    return response.status(400).send({'error': 'No Authorization'})
  }

  await bolgToDelete.delete()
  response.status(204).end()
  

  //---using old chained way:---//
  // Blog
  //   .findByIdAndRemove(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })
  //   .catch(error=> next(error))
})

//---token extraction is refactored as a middleware:---//
// const requestTokenFrom=(request) =>{
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

module.exports = blogsRouter