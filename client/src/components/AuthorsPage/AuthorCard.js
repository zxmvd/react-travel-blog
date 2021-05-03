import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import StarIcon from '@material-ui/icons/Star'
import ShareIcon from '@material-ui/icons/Share'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import femaleHead from '../../static/images/cards/female.png'
import maleHead from '../../static/images/cards/male.png'
import BlogPopper from './BlogPropper.js'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin:'10px',
    alignItems:'center',

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar:{
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}))

const AuthorCard=({ u }) => {


  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  return (
    <Card className={classes.root} >
      <CardHeader

        avatar={
          <Avatar src={u.is_male? maleHead: femaleHead} className={classes.avatar}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={u.name}
        subheader="Web Developer"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor .
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <StarIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <BlogPopper blogs={u.blogs}/>
      </CardActions>

    </Card>
  )


}

export default AuthorCard