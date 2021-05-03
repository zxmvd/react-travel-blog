import { createStore, combineReducers, applyMiddleware  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import createdReducer from './reducers/createdReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user:userReducer,
  users:usersReducer,
  created:createdReducer,

})

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store