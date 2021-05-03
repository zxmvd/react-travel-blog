import loginService from '../services/login'
import { displayMsg } from './notificationReducer'
import blogServices from '../services/blogs'

export const loginUser=({ username, password }) => {
  return async dispatch => {try {
    const loggedinUser = await loginService.login({ username, password })

    // console.log(loggedinUser)
    dispatch({ type:'SET USER', user:loggedinUser })
    blogServices.setToken(loggedinUser.token)

    dispatch(displayMsg({ message:`Welcome ${loggedinUser.name}`,error:false }))

    window.localStorage.setItem('loggedinBlogUser', JSON.stringify(loggedinUser))
  } catch(exception) {
    console.log('invalid username or password')
    dispatch(displayMsg({ message:'invalid username or password',error:true }))
  }
  }
}

export const logOutUser  = (dispatch) => {
  dispatch({ type:'SET USER', user:null })
  window.localStorage.removeItem('loggedinBlogUser')
  dispatch(displayMsg({ message:'Logged Out',error:true }))
}



const userReducer = (state=null, action) => {
  switch(action.type) {
  case 'SET USER':
    return action.user
  default:
    return state
  }


}

export default userReducer