import React, { useState, useEffect } from 'react'
import DestinationPageHeader from './DestinationPage/DestinationPageHeader'
import Footer from './Footer/Footer'
import { makeStyles } from '@material-ui/core/styles'

import classNames from 'classnames'
import styles from '../assets/jss/views/destinationPage.js'

import { leftColDestinations, rightColDestinations } from '../assets/destination'


const useStyles = makeStyles(styles)

const DestinationPage=({ match }) => {
  const destinations = [...leftColDestinations, ...rightColDestinations]
  const destinationString=match.params.des.split('\u00B7', 1)[0]
  const classes = useStyles()
  const [selectedDestination, setSelectedDes ] = useState({})

  useEffect(() => {
    window.scrollTo(0,0)
    setSelectedDes(destinations.find(p => p.des.split('\u00B7', 1)[0]===match.params.des))
  },[])


  let description
  if(selectedDestination.description) {
    description=selectedDestination.description.split('\n')
  }


  return(
    <div>
      <DestinationPageHeader destinationString={destinationString} img_url={selectedDestination.img_url}/>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.description}>
          <div className={classes.title}>
            <h2>{selectedDestination.descriptionTitle}</h2>
          </div>
          {description && description.map((i, key) => <p key={key}>{i}</p>)}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DestinationPage