import { HELLO_WORLD } from '../action-types/action-type'



const initialState = {
  hello : " Welcome to the Example Store",
};


function rootReducer(state = initialState, action) {
  if (action.type === HELLO_WORLD) {
    let change = {...state}
    change.hello = " FUCK YOU "
    return change
  }


  
  return state
}
  
export default rootReducer;