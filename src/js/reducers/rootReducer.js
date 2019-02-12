import { HELLO_WORLD, UPDATE_PRODUCTS, UPDATE_FILTERARR, UPDATE_FILTERKEY, UPDATE_TRYLOGIN, UPDATE_TRYREG } from '../action-types/action-type'



const initialState = {
  hello: " Welcome to the Example Store",
  productsArr: [],
  isLogin: false,
  searchArr: [],
  searchKey: [],
  tryLogin: false,
  tryReg: false,
};


function rootReducer(state = initialState, action) {
  // if (action.type === HELLO_WORLD) {
  //   let change = {...state}
  //   change.hello = " FUCK YOU "
  //   return change
  // }
  if (action.type === UPDATE_PRODUCTS) {
    let change = { ...state }
    change.productsArr = action.payload.sort((a, b) => {
      return new Date(b.uploaded_at) - new Date(a.uploaded_at)
    })
    change.searchArr = action.payload.sort((a, b) => {
      return new Date(b.uploaded_at) - new Date(a.uploaded_at)
    })
    return change
  }
  if (action.type === UPDATE_FILTERARR) {
    let change = { ...state }
    change.searchArr = action.payload.sort((a, b) => {
      return new Date(b.uploaded_at) - new Date(a.uploaded_at)
    })
    return change
  }
  if (action.type === UPDATE_FILTERKEY) {
    let change = { ...state }
    change.searchKey = action.payload
    return change
  }
  if (action.type === UPDATE_TRYLOGIN) {
    let change = { ...state }
    change.tryLogin = !change.tryLogin
    return change
  }
  if (action.type === UPDATE_TRYREG) {
    let change = { ...state }
    change.tryReg = !change.tryReg
    return change
  }


  return state
}

export default rootReducer;