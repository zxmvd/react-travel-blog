import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%',

    marginTop:'3.5rem',
    '@media (max-width: 992px)': {
      position:'fixed',
      top:'300px',
      width: '70%',
      border:'1px solid rgba(129, 248, 190, .5)',
      borderStyle:'solid none none none',
      backgroundColor:'white',
    },
  },
  sticky:{
    position:'fixed',
    top:'65px',
    margin:'0',
    width:'27%',

    '@media (max-width: 992px)': {
      width: '70%',
      border:'1px solid rgba(129, 248, 190, .5)',
      borderStyle:'solid none none none',
      backgroundColor:'white',
    },

  },
  bottom:{
    top: '-65px',
    '@media (max-width: 992px)': {
    top: '65px',
  },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
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
  buttonCancel:{
    margin: theme.spacing(2),
    marginLeft : 0,
    backgroundColor: 'rgba(2, 158, 82, 0.7)',
    color: '#f2f2f2',
    fontWeight: 'bold',
    '@media (min-width: 992px)': {
      display:'none',
    },

  }
}))

const BlogForm = ({ createBlog, blogFormRef }) => {

  const [ newBlog, setNewBlog ] = useState({ title:'', imgUrl:'', content:'' })

  const dispatch = useDispatch()

  const history = useHistory()

  const classes = useStyles()

  useEffect(() => {
    window.addEventListener('scroll', fixPosition)

    return function cleanup() {
      window.removeEventListener('scroll', fixPosition)
    }
  },[])

  const fixPosition=() => {
    const form=document.getElementById('formDiv')
    const height = 200
    if (form&&(window.pageYOffset >= height)){
      form.classList.add(classes.sticky)
      if (form&&((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight-90)) {
        form.classList.add(classes.bottom)
    } else {
      form.classList.remove(classes.bottom)

    }
    
    } 
    else {
      form.classList.remove(classes.sticky)

    }
  }

  const createdBlog = useSelector(({ created }) => created)

  useEffect(() => {
    if(createdBlog){
      history.push(`/blogs/${createdBlog.id}`)
    }
  },[createdBlog])


  const handlePostBlog =(event) => {
    event.preventDefault()
    dispatch(createBlog(newBlog))
    setNewBlog({ title:'', imgUrl:'', content:'' })
    blogFormRef.current.toggle()
    localStorage.setItem('page_y', 0)
  }

  return (
    <div className={classes.root} id='formDiv'>
      <form onSubmit={handlePostBlog}>
        <TextField
          label="Blog Tittle"
          placeholder="Your Blog Title"
          style={{ marginTop: 8 }}
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={newBlog.title}
          onChange={({ target }) => {setNewBlog({ ...newBlog, title: target.value })}}
        />
        <TextField
          label="Image Links"
          placeholder="Image Urls, seperate with ','"
          style={{ marginTop: '1rem' }}
          fullWidth
          multiline
          value={newBlog.imgUrl}
          rows={3}
          variant="outlined"
          onChange={({ target }) => {setNewBlog({ ...newBlog, imgUrl: target.value })}}
        />
        <TextField
          label="Blog Content"
          style={{ marginTop: '1rem' }}
          placeholder="Blog Content"
          fullWidth
          multiline
          value={newBlog.content}
          rows={8}
          variant="outlined"
          onChange={({ target }) => {setNewBlog({ ...newBlog, content: target.value })}}
        />
        <Button
          type='submit'
          variant="contained"
          size="medium"
          className={classes.button}
          startIcon={<CheckCircleIcon />}
        >Post Blog</Button>
        <Button
          size="medium"
          variant="contained"

          className={classes.buttonCancel}
          onClick={() => blogFormRef.current.toggle()}
        >
          Cancel
        </Button>

      </form>

    </div>

  )
}

export default BlogForm