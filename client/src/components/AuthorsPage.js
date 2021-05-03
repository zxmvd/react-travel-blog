import React  from 'react'
import { makeStyles } from '@material-ui/core/styles'

import classNames from 'classnames'
import styles from '../assets/jss/views/blogsListPageStyle.js'

import Grid from '@material-ui/core/Grid'
import BlogListHeader from './BlogList/BlogListHeader'
import AuthorCard from './AuthorsPage/AuthorCard'
import Footer from './Footer/Footer'



const useStyles = makeStyles(styles)

const AuthorsPage=({ users }) => {

  const classes = useStyles()
  window.scrollTo(0,0)



  return(
    <React.Fragment>
      <BlogListHeader subtitle='Authors--Browse by our experts'/>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container} >
          <Grid container item xs={12} md={10} lg={10} style={{ paddingTop:'4rem', margin:'auto' }}>
            {users.sort(function(a, b){return b.blogs.length - a.blogs.length}).map(u => (
              <Grid key={u.id} item xs={12} sm={6} md={4} lg={4}>
                <AuthorCard u={u}/>
              </Grid>
            ))
            }
          </Grid>
        </div>

      </div>
      <Footer />
    </React.Fragment>

  )


}

export default AuthorsPage