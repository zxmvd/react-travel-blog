const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helpers')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token =''
const initialBlogs = [
  {title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7}, 
  {title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5}
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const newBlogs = initialBlogs.map((blog)=>new Blog(blog))
  const promiseArray = newBlogs.map(b=> b.save())
  await Promise.all(promiseArray)

  await User.deleteMany({ username: 'test_user' })
  token = await helper.newUserToken()
  //   let blogObject = new Blog(initialBlogs[0])
  //   await blogObject.save()

  //   blogObject = new Blog(initialBlogs[1])
  //   await blogObject.save()

})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'React patterns'
  )
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Canonical string reduction', 
    author: 'Edsger W. Dijkstra', 
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 
    likes: 12
  }

  const addedBlog = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(addedBlog.body.likes).toBe(12)
  console.log('+++121212', addedBlog.body)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Canonical string reduction'
  )
})


// npm test -- -t "a blog without likes can be added with 0 likes" 
test('a blog without likes can be added with 0 likes', async () => {
  const newBlog = {
    title: 'Canonical string reduction', 
    author: 'Edsger W. Dijkstra', 
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 
  }
  
  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  expect(addedBlog.body.likes).toBe(0)  

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)
  
  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Canonical string reduction'
  )

  const likes = blogsAtEnd[blogsAtEnd.length-1].likes
  expect(likes).toBe(0)
})

test('blog without content is not added', async () => {
  const newBlog = {
    author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${token}`)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
//   const blogsAtStart = await helper.blogsInDb()
  const blogs = await api.get('/api/blogs')
  const blogsAtStart = blogs.body
  const blogToView = blogsAtStart[0]

  console.log('1', blogsAtStart)
  console.log('2', blogToView)

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    console.log('resultBlog_body', resultBlog.body)

  expect(resultBlog.body).toEqual(blogToView)
  
  console.log('to view', blogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(
    initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const content = {
    title: 'Canonical string reduction 2', 
    author: 'Edsgera', 
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/update',
    likes: 8
  }
  

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(content)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const resultBlog = await api.get(`/api/blogs/${blogToUpdate.id}`)

  expect(resultBlog.body.likes).toBe(8)
    
  expect(resultBlog.body.title).toBe('Canonical string reduction 2')
})

afterAll(() => {
  mongoose.connection.close()
})