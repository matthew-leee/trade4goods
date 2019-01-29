import { HELLO_WORLD,UPDATE_PRODUCTS,UPDATE_FILTERARR,UPDATE_FILTERKEY } from '../action-types/action-type'



const initialState = {
  hello : " Welcome to the Example Store",
  productsArr: [],
  isLogin: false,
  searchArr: [],
  searchKey: []
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
  if (action.type === UPDATE_FILTERARR) {
    let change = {...state}
    change.searchArr = action.payload
    return change
  }
  if (action.type === UPDATE_FILTERKEY) {
    let change = {...state}
    change.searchKey = action.payload
    return change
  }

  
  return state
}
  
export default rootReducer;