import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import ListIcon from '@material-ui/icons/List'
import IconButton from '@material-ui/core/IconButton'
import { Link as RouterLink } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  icon:{
    position:'relative',
    right: '-58px',
  },
  post:{
    position:'relative',
    right: '-68px',
    fontSize:'1rem',
    verticalAlign:'middle'
  }

}))

const BlogPopper=({ blogs }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <div>
        <span className={classes.post}>{`${blogs.length}${blogs.length>1? ' posts':' post'}`} </span>

        {blogs.length>0?
          <IconButton className={classes.icon} onClick={handleClick}>
            <ListIcon aria-describedby={id} variant="contained" color="primary"/>
          </IconButton>
          :
          null
        }
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <div className={classes.typography}>{
          blogs.map(b => <p key={b.id}><RouterLink to={`/blogs/${b.id}`}>{b.title.slice(0,35)}</RouterLink></p>)}
        </div>
      </Popover>
    </div>
  )
}

export default BlogPopper