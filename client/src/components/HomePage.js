import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// core components
import Header from './Header'
import Footer from './Footer/Footer.js'
import GridContainer from './Grid/GridContainer.js'
import GridItem from './Grid/GridItem.js'

import image from '../static/images/mountains.png'
import { leftColDestinations, rightColDestinations } from '../assets/destination'
import GridImg from './HomePage/GridImg.js'

import classNames from 'classnames'
import styles from '../assets/jss/views/home.js'


const useStyles = makeStyles(styles)

const HomePage = () => {
  const classes = useStyles()
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  )

  useEffect(() => {
    const hash = location.hash
    if (hash && document.getElementById(hash.substr(3))) {
      // Check if there is a hash and if an element with that id exists
      document.getElementById(hash.substr(3)).scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])


  return (
    <div>
      <Header />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <div className={classes.profile}>
                <div  id='destinationSection'>
                  <img src={image} alt="..." className={imageClasses} />
                </div>
                <div className={classes.name}>
                  <h3 className={classes.title}>Beautiful Destinations</h3>
                </div>
              </div>
            </GridItem>
          </GridContainer>
          <div className={classes.description}>
            <p>
              Beautiful Destinations is a source of daily travel and lifestyle inspiration
              for millions of people around the world. We share stories highlighting the
              incredible people, the extraordinary places and spectacular experiences all
              around the globe. We hope to inspire, educate and motivate our community
              through our storytelling!.
            </p>
          </div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={9} className={classes.navWrapper}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  {leftColDestinations.map(d => (
                    <GridImg key={d.des} d={d} left={true}/>
                  )
                  )}
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  {rightColDestinations.map(d => (
                    <GridImg key={d.des} d={d}/>
                  )
                  )}
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  )

}

export default HomePage