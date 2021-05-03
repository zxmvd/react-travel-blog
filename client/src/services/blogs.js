import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken =(tokenToSet) => {
  token =  `bearer ${tokenToSet}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNewBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, { headers:{ Authorization:token } })
  return response.data
}

const removeBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers:{ Authorization:token } })
  return response
}

const addComment = async(comment,id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const likeComment = async(comment, blogId, commentId) => {
  const response = await axios.put(`${baseUrl}/${blogId}/comments/${commentId}`, comment)
  return response.data
}

const getAllComment = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}


const updateBlog = async (updatedBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

export default { getAll, postNewBlog, setToken, updateBlog, removeBlog, likeComment, addComment, getAllComment }