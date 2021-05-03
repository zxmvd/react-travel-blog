const usersReducer = (state=[], action) => {
  switch(action.type){
  case 'SET ALL USERS':
    return action.data

  case 'UPDATE USER BLOG LIST':
    return state.map(u =>
      u.id===action.data.user.id?
        [...u.blogs,action.data]
        :
        u
    )

  default:
    return state
  }


}

export default usersReducer