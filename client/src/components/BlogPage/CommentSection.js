import React from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import blogService from '../../services/blogs'
import IconButton from '@material-ui/core/IconButton'

import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import Tooltip from '@material-ui/core/Tooltip'
import AddCommentTwoToneIcon from '@material-ui/icons/AddCommentTwoTone'
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone'

import Button from '@material-ui/core/Button'
import SendIcon from '@material-ui/icons/Send'
import GetAppTwoToneIcon from '@material-ui/icons/GetAppTwoTone'
import CustomInput from '../CustomInput/CustomInput'

import { displayMsg } from '../../reducers/notificationReducer'


const CommentSection = ({ classes, comments, blog, user, setComments }) => {
  const [expanded, setExpanded] = React.useState(false)
  const [expandedForm, setExpandedForm] = React.useState(false)

  const dispatch = useDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded)
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })
    },200)

  }
  const handleExpandFormClick = () => {
    setExpandedForm(!expandedForm)
    setTimeout(() => {
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' })
    },200)
  }

  const likeComment=async(comment) => {
    // let page_y = window.pageYOffset
    // localStorage.setItem('page_y', page_y)
    const newComment = { ...comment, likes:comment.likes+1 }
    const likedComment = await blogService.likeComment(newComment, blog.id, comment.id)
    const newComments = comments.map(c => c.id===comment.id? likedComment:c)
    setComments(newComments)
    dispatch(displayMsg({ message:'Thank you for the heart!', error:false }))

  }


  const handleComment = async({ target }) => {
    if(user){
      const content = target.comment.value
      const newComment = {
        content,
        blog: blog.id,
        user: {
          username:user.username,
          id:user.id
        }
      }
      const addedComment = await blogService.addComment(newComment,blog.id)
      setComments([...comments,addedComment])
      window.scrollTo(0,0)
      dispatch(displayMsg({ message:'Thank you for Comment!', error:false }))
    }

    else {
      dispatch({
        type: 'SET NOTIFICATION',
        data: { message:'You Have to Login To Post Blog', error:true }
      })
    }
  }

  const commentForm =() => (
    <form onSubmit={handleComment}>
      <CustomInput
        labelText={user?
          'Have your thoughts?'
          :'Log In to Leave a Comment'}
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type: 'text',
          disabled:user? false:true,
          name:'comment',
          required:true,
        }}
      />

      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<SendIcon/>}
        type='submit'
        disabled={user? false:true}

      >
            Comment!
      </Button>
      {user? null:
        <Link to={{ pathname:'/login', state: { from: JSON.stringify(location) } }} style={{ textDecoration:'underline', fontSize:'18px',marginLeft:'1rem',verticalAlign: 'baseline' }}>
             Log In
        </Link>}
    </form>
  )

  const commentList = () => (
    <div style={{ marginLeft:'3rem' }}>
      {comments.map(c =>
        <Typography paragraph key={c.id}>
          <span style={{ fontWeight:'500' }}>
            {c.user.username? c.user.username:'Anomynous'} Commented on {c.date.split('T')[0]}
          </span><br/>
          {c.content}
          <span className={classes.iconColor}>
            <Tooltip title="I agree">
              <IconButton className={classes.iconColor} onClick={() => likeComment(c)}>
                <FavoriteTwoToneIcon/>
              </IconButton>
            </Tooltip>
            <span style={{ marginLeft:'-0.8rem' }}>{c.likes} liked</span>
          </span>

        </Typography>)}
    </div>
  )

  return(
    <div  >
      <h3 >
        {`${comments.length} ${comments.length>1? 'Comments':'Comment'}`}
        {comments.length>0 && <Tooltip title={expanded? 'Hide Comment':'Show Comment'}>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <GetAppTwoToneIcon className={classes.iconColor}/>
          </IconButton>
        </Tooltip> }
        <Tooltip title="Add Your Comment">
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expandedForm,
            })}
            onClick={handleExpandFormClick}
            aria-expanded={expandedForm}
            aria-label="show more"
          >
            <AddCommentTwoToneIcon className={classes.iconColor}/>
          </IconButton>
        </Tooltip>
      </h3>
      <Collapse in={expandedForm} timeout="auto" unmountOnExit>
        <div>
          {commentForm()}
        </div>
      </Collapse>
      <Collapse in={expanded} timeout="auto" unmountOnExit  >
        {commentList()}
      </Collapse>
    </div>
  )
}

export default CommentSection