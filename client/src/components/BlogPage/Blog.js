import React, { useState, useEffect } from 'react'
import { updateLikes, deleteBlog } from '../../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import blogService from '../../services/blogs'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone'

import Tooltip from '@material-ui/core/Tooltip'

import BlogCarousel from './BlogCarousel'
import UserPropper from './UserPropper'
import CommentSection from './CommentSection'
import { deepGreen } from '../../assets/jss/main'



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    width:'36.25%',
    paddingTop: '36.25%',
    margin:'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  iconColor:{
    color:deepGreen,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    margin: theme.spacing(2),
    marginLeft : 0,
    backgroundColor: 'rgba(2, 158, 82, 0.7)',
    color: '#f2f2f2',
    fontWeight: 'bold',
    '&:hover':{
      backgroundColor: 'rgba(2, 158, 82, 0.8)',
    }
  },
  avatar: {
    margin: '8px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  blogTitle: {
    display: 'inline-block',
    position: 'relative',
    overflow:'hidden',
    marginBottom:'0',
    color:'rgba(0, 0, 0, .8)',
    textDecoration: 'none',
    '& p':{
      fontSize:'14px',
      color:'#4a4a4a',
      lineHeight: '1rem',
      fontWeight:'200',
      marginTop:'1rem',
    },
    '@media (max-width: 992px)': {
      width: '100%',
    },
  },
  content:{
    lineHeight:'2rem',
    fontSize:'18px',
    margin:'0 0 2rem 1rem'
  }
}))


const Blog = ({ blog, user }) => {
  const [comments, setComments] = useState([])

  const classes = useStyles()

  const dispatch = useDispatch()
  const history = useHistory()


  useEffect(() => {
    const getComments = async() => {
      const comments = await blogService.getAllComment(blog.id)
      setComments(comments)
    }
    if(blog){getComments()}

  },[blog])

  const handleLike = () => {
    let page_y = window.pageYOffset
    localStorage.setItem('page_y', page_y)
    const newBlog={ ...blog, likes: blog.likes+1 }
    dispatch(updateLikes(newBlog, blog.id))

  }

  const handleDelete=() => {
    let confirm = window.confirm(`are you sure to remove ${blog.title + ' posted by you'}`)
    if(confirm) {
      dispatch(deleteBlog(blog.id))
      dispatch({ type:'ADDED BLOG', data:null })
      history.push('/blogs')
    }
  }

  Blog.displayName = 'Blog Name'

  if (!blog){return null}
  return (
    <div>
      <div>
        <h3 className={classes.blogTitle}>
          {blog.title}
        </h3>
        <UserPropper user={user} blog={blog} handleDelete={handleDelete} classes={classes}/>
        <BlogCarousel imgUrl={blog.imgUrl}/>

        <span>
          {blog.content.split('\n').map((i, key) => <p className={classes.content} key={key}>{i}</p>)}
        </span>
        <p>
          <Tooltip title="Like This Blog">
            <IconButton  onClick={handleLike}>
              <ThumbUpAltTwoToneIcon className={classes.iconColor}/>
            </IconButton>
          </Tooltip>

          {blog.likes} liked
        </p>
      </div>
      <hr/>
      <CommentSection classes={classes} comments={comments} blog={blog} user={user} setComments={setComments}/>
    </div>
  )
}
export default Blog
