import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import styles from '../../assets/jss/views/blogsListPageStyle.js'
import femaleHead from '../../static/images/cards/female.png'
import maleHead from '../../static/images/cards/male.png'
import ThumbUpAltTwoToneIcon from '@material-ui/icons/ThumbUpAltTwoTone'
import VisibilityIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles(styles)

export default function BlogListItem({ blog }) {
  const classes = useStyles()

  return (
    <div>
      <Grid container className={classes.blogItem}>

        <Grid container item xs={12} md={4} large={4} spacing={1}>
          <Grid item xs={4} md={4} large={4}>
            <ListItemAvatar >
              <Avatar alt="Remy Sharp" src={blog.user.is_male? maleHead:femaleHead} className={classes.large}/>
            </ListItemAvatar>
          </Grid>
          <Grid item xs={8} md={8} large={8}>
            <div className={classes.name} >
              {blog.user.name}<br/>
              <span className={classes.date}>{blog.date.split('T')[0]}<br/>
                <p style={{ lineHeight:'1.5rem' }}>

                  <ThumbUpAltTwoToneIcon style={{ verticalAlign:'sub', fontSize:'1rem' }}/>  {blog.likes} {blog.likes>1? 'likes':'like'}<br/>
                  <VisibilityIcon style={{ verticalAlign:'sub', fontSize:'1rem' }}/>  {Math.round(Math.random()*1000)} views

                </p>
              </span>

            </div>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={8} large={8}>

          <div variant="h6" className={classes.blogTitle}>
            {blog.title.slice(0,70)}
            <br />
            <p variant="h2">{blog.content.slice(0,150)}...</p>
          </div>
        </Grid>
      </Grid>
      <Divider  variant="fullWidth" component="li" className={classes.divider}/>
    </div>
  )
}