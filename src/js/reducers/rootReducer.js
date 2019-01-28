import { HELLO_WORLD,UPDATE_PRODUCTS } from '../action-types/action-type'



const initialState = {
  hello : " Welcome to the Example Store",
  productsArr: [],
  isLogin: false
};


function rootReducer(state = initialState, action) {
  if (action.type === HELLO_WORLD) {
    let change = {...state}
    change.hello = " FUCK YOU "
    return change
  }
  if (action.type === UPDATE_PRODUCTS) {
    let change = {...state}
    change.productsArr = action.payload
    return change
  }

  
  return state
}
  
export default rootReducer;