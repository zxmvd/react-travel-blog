const setNotification = (msg) => {
  return{
    type: 'SET NOTIFICATION',
    data: msg
  }
}

export const displayMsg = (msg) => {
  return dispatch => {
    dispatch(setNotification(msg))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }
}


const notificationReducer = (state='', action) => {

  switch(action.type) {
  case 'SET NOTIFICATION':
    return action.data
  default:
    return state
  }
}

export default notificationReducer