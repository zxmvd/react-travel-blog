import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { addBlog } from '../reducers/blogReducer'
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styles from '../assets/jss/views/blogsListPageStyle.js'

import BlogListHeader from './BlogList/BlogListHeader'
import GridContainer from './Grid/GridContainer.js'
import GridItem from './Grid/GridItem.js'
import List from '@material-ui/core/List'
import BlogListItem from './BlogList/BlogListItem'
import Footer from './Footer/Footer'

const useStyles = makeStyles(styles)

const BlogListPage=({ blogFormRef, blogs }) => {

  const classes = useStyles()
  const dispatch = useDispatch()
  // window.scrollTo(0,0)

  useEffect(() => {
    const clearAddedBlog=() => {
      dispatch({ type:'ADDED BLOG', data:null })
    }
    clearAddedBlog()
  },[])

  return(
    <React.Fragment>
      <BlogListHeader subtitle='Blogs--Find the good out there.'/>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} justify="center">
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}  lg={8} >
              <List className={classes.list}>
                {blogs.map(blog => <RouterLink key={blog.id} to={`/blogs/${blog.id}`}>
                  <BlogListItem blog={blog}/>
                </RouterLink>)}
              </List>
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

export default BlogListPage