import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone'



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      flexWrap: 'wrap',
      alignItems:'center',
      textAlign:'center',
      margin: '4rem auto 1rem',
      width:'80%',
    },
    color:'#2196f3',
    '@media (max-width: 992px)': {
      position:'fixed',
      top:'10rem',
      right:'2rem',
    },
  },
  sticky:{
    position:'fixed',
    top:'2rem',
    maxWidth:'25%',
    '@media (max-width: 992px)': {
      top:'1rem',
      right:'1rem',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  btn_description:{
    fontFamily:'"Patrick Hand SC", "Times New Roman", serif, cursive',
    fontWeight:'800',
    fontSize:'56px',
    lineHeight:'66px',
    color:'rgba(204, 102, 255, .8)',
    '@media (max-width: 992px)': {
      display:'none',

    },
  },
  lockIcon:{
    position:'absolute',
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s, opacity 1.5s linear',

  },
  editIcon:{
    position:'absolute',
    visibility: 'visible',
    opacity: 1,
  },
  button:{
    backgroundColor:'#9ff9ce',
    padding:'auto',
    position:'relative',
    width:'75px',
    height:'75px',
    color: 'white',
    boxShadow:'0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
    '&:hover':{
      backgroundColor:'#6ef7b5',
      transition: '0.2s ease',
      boxShadow:'0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 11%), 0px 1px 18px 0px rgb(0 0 0 / 14%)',
      '& $lockIcon':{
        visibility: 'visible',
        opacity: 1,
      },
      '& $editIcon':{
        visibility: 'hidden',
        opacity: 0,
        transition: 'visibility 0s, opacity 1.5s linear',
      },
    }
  }
}))


const NewBlogButton = ({ toggle, lable }) => {

  const classes = useStyles()
  const loggedInUser = useSelector(state => state.user)
  useEffect(() => {
    window.addEventListener('scroll', fixNewBlogButton)
    return function cleanup() {
      window.removeEventListener('scroll', fixNewBlogButton)
    }
  },[])


  const fixNewBlogButton=() => {
    const button=document.getElementById('newBlogButton')
    const height = 300
    if (window.pageYOffset >= height){
      button.classList.add(classes.sticky)
    } else {
      button.classList.remove(classes.sticky)
    }
  }
  const dispatch = useDispatch()

  const handleClickNewBlog = () => {
    setTimeout(() => {
      dispatch({
        type: 'SET NOTIFICATION',
        data: { message:'You Have to Login To Post Blog', error:true }
      })
    },500)
  }

  return (
    loggedInUser?
      <div className={classes.root} id="newBlogButton">
        <div>
          <Tooltip className={classes.button} title={lable}>
            <Fab  onClick={() => toggle()} >
              <CreateTwoToneIcon style={{ fontSize: 40, color:'rgb(204, 102, 255)' }}/>
            </Fab>
          </Tooltip>
          <h2 className={classes.btn_description}>Share Your Thoughts Here...</h2>
        </div>
      </div>
      :

      <div className={classes.root} id="newBlogButton">
        <div>
          <Link to={{ pathname:'/login', state: { from: JSON.stringify(location) } }}   onClick={handleClickNewBlog} >
            <Tooltip className={classes.button} title='Proceed to Log In to Post Blog'>
              <Fab>
                <CreateTwoToneIcon className={classes.editIcon} style={{ fontSize: 40, color:'rgb(204, 102, 255)' }}/>
                <LockOpenTwoToneIcon className={classes.lockIcon} style={{ fontSize: 40, color:'rgb(204, 102, 255)', }}/>
              </Fab>
            </Tooltip>
          </Link>
          <h2 className={classes.btn_description}>Share Your Thoughts Here...</h2>
        </div>
      </div>
  )
}

export default NewBlogButton