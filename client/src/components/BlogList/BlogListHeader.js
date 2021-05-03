import React from 'react'
import Parallax from '../Parallax'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../assets/jss/header.js'
import backImg from '../../static/images/profile-bg.jpg'


const useStyles = makeStyles(styles)

const BlogListHeader =({ subtitle, xs }) => {
  const classes = useStyles()
  return (
    <Parallax small xs={xs} image={backImg}>
      <div className={classes.container}>
        <div className={classes.brand}>
          <h1 className={classes.title}>
          </h1>
          <h3 className={classes.subtitle}>
            {subtitle}
          </h3>
        </div>
      </div>
    </Parallax>
  )
}

export default BlogListHeader
