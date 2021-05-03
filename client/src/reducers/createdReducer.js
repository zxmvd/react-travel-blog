
const createReducer =(state=null, action) => {
  switch(action.type){
  case('ADDED BLOG'):
    return action.data
  default:
    return state
  }

}

export default createReducer