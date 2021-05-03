import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Avatar from '@material-ui/core/Avatar'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

import StarIcon from '@material-ui/icons/Star'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import ShareIcon from '@material-ui/icons/Share'

import femaleHead from '../../static/images/cards/female.png'
import maleHead from '../../static/images/cards/male.png'


const UserPropper = ({ blog, handleDelete, classes, user }) =>
{
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [placement, setPlacement] = React.useState()

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  const handleClickAway = () => {
    setOpen(false)
  }
  return (
    <div >
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition style={{ zIndex:'3' }}>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              <Card className={classes.root}>
                <CardHeader
                  title={blog.user.username}
                  subheader="Active since September, 2016"
                />
                <CardMedia
                  className={classes.media}
                  image={blog.user.is_male? maleHead:femaleHead}

                  title={blog.user.name}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                  Sit amet risus nullam eget. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam.
                  Tortor pretium viverra suspendisse potenti nullam ac tortor.
                  </Typography>
                </CardContent>
                <IconButton aria-label="add to favorites">
                  <StarIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </Card>

            </Fade>
          </ClickAwayListener>
        )}
      </Popper>




      <div style={{ display: 'inline-flex',alignItems: 'center',  }}>
        <Tooltip title="Memmber Profile">
          <IconButton style={{ marginLeft:'-12px' }} onClick={handleClick('bottom-start')}>
            <Avatar alt="Remy Sharp" src={blog.user.is_male? maleHead:femaleHead} className={classes.large}/>
          </IconButton>
        </Tooltip>
        <p style={{ margin:'auto 0.5rem' }}>{blog.user? blog.user.username:'Anomynous'} posted on September 14, 2016</p>

        {user?
          (user.id===blog.user.id &&
          <Tooltip title="You Can Delete This Blog">
            <IconButton  onClick={handleDelete}>
              <DeleteForeverIcon/>
            </IconButton>
          </Tooltip>)
          :
          null}
      </div>

    </div>
  )


}

export default UserPropper