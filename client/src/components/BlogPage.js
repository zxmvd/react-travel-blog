import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { addBlog } from '../reducers/blogReducer'
import BlogListHeader from './BlogList/BlogListHeader'
import GridContainer from './Grid/GridContainer.js'
import GridItem from './Grid/GridItem.js'
import Blog from './BlogPage/Blog'
import Footer from './Footer/Footer'

import classNames from 'classnames'
import styles from '../assets/jss/views/blogsListPageStyle.js'


const useStyles = makeStyles(styles)

const BlogPage=({ blogFormRef, blog, user }) => {
  const classes = useStyles()

  // let currentPageY = localStorage.getItem('page_y')
  // if (currentPageY ){
  //   window.scrollTo( 0, currentPageY )
  //   // setTimeout(() => {
  //   //   localStorage.setItem('page_y',0)
  //   // },5000)
  // } 
  // else {
  //   window.scrollTo(0,0)
  // }


  return(
    <React.Fragment>
      <BlogListHeader xs={true} subtitle={blog&&`Blog-${blog.title.slice(0,25)}`}/>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} justify="center">
          <GridContainer>

            <GridItem xs={12} sm={12} md={8}  lg={8} >
              <Blog blog={blog} user={user} blogFormRef={blogFormRef}/>
            </GridItem >
            <GridItem xs={12} sm={12} md={4}  lg={4}>
              {addBlog(blogFormRef)}
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}
export default BlogPage