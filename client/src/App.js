import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initilizeBlogs } from './reducers/blogReducer'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import userService from './services/users'
import Nav from './components/Nav'
import HeaderLinks from './components/HeaderLinks'
import './assets/scss/material-kit-react.scss?v=1.9.0'
import HomePage from './components/HomePage'
import DestinationPage from './components/DestinationPage'
import BlogListPage from './components/BlogListPage'
import BlogPage from './components/BlogPage'
import LoginPage from './components/LoginPage'
import MessageSnackbar from './components/MessageSnackbar'
import AuthorsPage from './components/AuthorsPage'



const App = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()


  useEffect(() => {
    const user = window.localStorage.getItem('loggedinBlogUser')
    if (user) {
      dispatch({ type:'SET USER',user:JSON.parse(user) })
    }
  }, [])

  useEffect(() => {
    const fetchUsers=async () => {
      const fetch_users=await userService.getAllUsers()
      dispatch({ type:'SET ALL USERS', data:fetch_users })
    }

    dispatch(initilizeBlogs())
    fetchUsers()

  },[])

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogToView = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  const blogFormRef = useRef()

  return (
    <div>

      <Nav
        brand="Go Explore"
        rightLinks={<HeaderLinks />}
        fixed
        loggedInUser={user}
        color="transparent"
        changeColorOnScroll={{
          height: 200,
          color: 'white'
        }}
      />
      {notification && <MessageSnackbar n={notification}/>}
      <Switch>
        <Route path='/blogs/:id'>
          <BlogPage blog={blogToView} user={user} blogFormRef={blogFormRef}/>
        </Route>

        <Route path='/destination/:des' component={DestinationPage}/>

        <Route path='/blogs'>
          <BlogListPage blogFormRef={blogFormRef} blogs={blogs}/>
        </Route>

        <Route path='/authors'>
          <AuthorsPage users={users}/>
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>

        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </div>
  )
}

export default App