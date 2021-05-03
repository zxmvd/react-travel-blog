import React from 'react'
import Parallax from '../Parallax'

import { makeStyles } from '@material-ui/core/styles'
import styles from '../../assets/jss/views/destinationHeaderStyle.js'
import TypingTexts from 'react-rotating-text'

const useStyles = makeStyles(styles)

const DestinationPageHeader =({ destinationString, img_url }) => {
  const classes = useStyles()
  return (
    <Parallax image={img_url}>
      <div className={classes.container}>
        <div className={classes.brand}>
          <h1 className={classes.title}>Explore<span className={classes.title_des}>
            <TypingTexts cursor={false} typingInterval={400} pause={80000} items={[destinationString[0]+destinationString.slice(1).toLowerCase()]} />
          </span></h1>
        </div>
      </div>
    </Parallax>
  )
}

export default DestinationPageHeader
