import blogService from '../services/blogs'
import userService from '../services/users'
import React from 'react'
import { displayMsg } from './notificationReducer'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const user = JSON.parse(window.localStorage.getItem('loggedinBlogUser'))

export const addBlog = (blogFormRef) => {
  return (
    <Togglable buttonLable='add new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} blogFormRef={blogFormRef} />
    </Togglable>
  )
}

export const deleteBlog = (blogId) => {
  blogService.setToken(user.token)
  return async dispatch => {
    const request = await blogService.removeBlog(blogId)
    dispatch({ type: 'DELETE', id:blogId })
    dispatch(displayMsg({ message:'Your Blog deleted Successfully',error:false }))
  }
}

export const createBlog = (newBlog) => {
  const blogToSave = { ...newBlog, imgUrl:newBlog.imgUrl.split(',') }
  blogService.setToken(user.token)
  return async dispatch => {
    try {
      const addedBlog = await blogService.postNewBlog(blogToSave)
      const fetch_users=await userService.getAllUsers()
      dispatch(addBlogAction(addedBlog))
      dispatch({ type:'ADDED BLOG', data:addedBlog })
      dispatch({ type:'SET ALL USERS', data:fetch_users })
      dispatch(displayMsg({ message:`${addedBlog.user.name}'s Blog Added Successfully`,error:false }))
    }
    catch(exception) {
      dispatch(displayMsg({ message:'can\'t post blog',error:true }))
    }}
}

export const updateLikes = (newBlog, id) => {
  return async dispatch => {try {
    const updatedBlog = await blogService.updateBlog(newBlog, id)
    dispatch(likeBlog(updatedBlog))
    dispatch(displayMsg({ message:`Thank you for liked ${newBlog.user.name}'s blog`, error:false }))
  } catch (exceptions) {
    console.log('cant update blog likes')
  }}
}


export const setBlogs =(blogs) => {
  return {
    type: 'SET BLOGS',
    data: blogs
  }
}

const addBlogAction = (addedBlog) => {
  return{
    type: 'ADD BLOG',
    data: addedBlog
  }
}

const likeBlog = (updatedBlog) => {
  return{
    type: 'LIKE',
    data: updatedBlog
  }
}


export const initilizeBlogs =() => {
  return dispatch => {blogService.getAll().then(blogs => {
    const sortedBlogs = blogs.sort(function(a,b){
      return-(a.likes-b.likes)
    })
    dispatch({
      type: 'INIT BLOG',
      data: sortedBlogs
    })
  })}
}

const blogReducer = (state=[], action) => {
  switch(action.type) {
  case 'INIT BLOG' :
    return action.data
  case 'SET BLOGS':
    return action.data

  case 'ADD BLOG':
    return [...state, action.data]

  case 'LIKE' :
  {const newBlogs = state.map(blog => blog.id===action.data.id? action.data : blog)
    return newBlogs}

  case 'DELETE':
  {const blogsAfterDelete = state.filter(b => b.id!==action.id)
    return blogsAfterDelete}

  default:
    return state

  }
}

export default blogReducer