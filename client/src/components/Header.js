import React from 'react'
import Parallax from './Parallax'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../assets/jss/header.js'
import kamchatka from '../static/videos/kamchatka.mp4'

const useStyles = makeStyles(styles)

const Header =() => {
  const classes = useStyles()

  return (
    <Parallax img={null}>
      <video className={classes.video} autoPlay loop muted>
        <source src={kamchatka} type='video/mp4' />
      </video>
      <div className={classes.container}>

        <div className={classes.brand}>
          <h1 className={classes.title}>Never Stop Exploring</h1>
          <h3 className={classes.subtitle}>
          Find the good out there.
          </h3>
        </div>

      </div>
    </Parallax>
  )
}

export default Header
