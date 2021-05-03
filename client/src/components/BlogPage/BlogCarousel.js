import React from 'react'
// react component for creating beautiful carousel
import Carousel from 'react-slick'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
// core components
import Card from '../Card/Card.js'

const useStyles = makeStyles(() => ({
  marginAuto: {
    marginLeft: 'auto !important',
    marginRight: 'auto !important'
  }

}))

export default function BlogCarousel({ imgUrl }) {
  const classes = useStyles()

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  }

  return (
    <div classes={classes.marginAuto}>
      <Card carousel>
        <Carousel {...settings}>
          {imgUrl.map((i,index) => {
            return(
              <div key={index}>
                <img src={i} alt="First slide" className="slick-image"/>
              </div>
            )
          })}
        </Carousel>
      </Card>
    </div>
  )
}
