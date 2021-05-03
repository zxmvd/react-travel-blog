import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import styles from '../../assets/jss/views/home.js'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(styles)

const GridImg =({ d, left }) => {
  const classes = useStyles()

  const navImageClasses = classNames(classes.imgGallery)
  const newImgContainer = classNames(classes.img_container, 'img_txt_box')

  return (

    <div className={newImgContainer}>

      <Link to={`/destination/${d.des.split('\u00B7')[0]}`} des={d.des}>
        <img
          alt="..."
          src={d.link}
          className={navImageClasses}
        />
        <div className={classes.overlay}>
          <div className={`img_txt ${+left?'img_txt_left': 'img_txt_right'}`}>
            <h3 className={classes.img_txt}>{d.des}</h3>
          </div>
          <p>{d.descriptionTitle}</p>

        </div>

      </Link>
    </div>
  )
}

export default GridImg