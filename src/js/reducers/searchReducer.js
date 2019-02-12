const searchReducer = (state = {
    search: "",
    submit: "",
    allProducts: [],
    myProducts: [],
    fProducts: [],
    currentProduct: {},
    currentOutProduct: {},
    reqError: false,
    copyState: {
        productsArr: [],
        filterArr: [],
        showArr: [],
        remainShowingBatch: 0,
        showingBatch: 0,
        hasmore: true
    },
    refresh: 1
}, action) => {
    switch (action.type) {
        case "STORE_SEARCH":
            return {
                ...state,
                search: action.search
            }
        case "SUBMIT_SEARCH":
            const submit = state.search
            return {
                ...state,
                submit: submit,
                search: ""
            }
        case "CLEAR_SEARCH":
            return {
                ...state,
                submit: "",
                search: ""
            }
        case "STORE_ALL_PRODUCTS":
            const sorted = [...action.allProducts].sort((a,b)=>{
                return new Date(b.uploaded_at) - new Date(a.uploaded_at)
            })
            return {
                ...state,
                allProducts: sorted
            }
        case "OPEN_ONE_MODAL":
            const newProducts = state.allProducts.map((u) => {
                if (u.product_id == action.id) {
                    if (u.openOneModal == true) {
                        u.openOneModal = false
                        u.openOGModal = false
                        u.openMyGoodModal = false
                        u.openDELModal = false
                    } else {
                        u.openOneModal = true
                    }
                    return u
                } else {
                    return u
                }
            })
            return {
                ...state,
                allProducts: newProducts
            }
        case "OPEN_OG_MODAL":
            const ogProducts = state.allProducts.map((u) => {
                if (u.product_id == action.ogID) {
                    u.openOGModal = !u.openOGModal
                    return u
                } else {
                    return u
                }
            })
            return {
                ...state,
                allProducts: ogProducts
            }
        case "OPEN_DEL_MODAL":
            const delProducts = state.allProducts.map((u) => {
                if (u.product_id == action.delID) {
                    u.openDELModal = !u.openDELModal
                    return u
                } else {
                    return u
                }
            })
            return {
                ...state,
                allProducts: delProducts
            }
        case "OPEN_MYGOOD_MODAL":
            const mgProducts = state.allProducts.map((u) => {
                if (u.product_id == action.mgID) {
                    u.openMyGoodModal = !u.openMyGoodModal
                    return u
                } else {
                    return u
                }
            })
            return {
                ...state,
                allProducts: mgProducts,
            }
        case "SET_MY_PRODUCTS":
            return {
                ...state,
                myProducts: state.allProducts.filter((u) => {
                    return u.uploaded_by == action.id
                })
            }
        case "FILTER_MY_PRODUCTS":
            return {
                ...state,
                myProducts: state.myProducts.filter((u) => {
                    return u.product_id !== action.id
                })
            }
        case "SET_F_PRODUCTS":
            return {
                ...state,
                fProducts: state.allProducts.filter((u) => {
                    return u.liked_by.some((a) => {
                        return a == action.id
                    })
                })
            }
        case "SORT_FPRODUCTS":
            if (action.sort == "date") {
                return {
                    ...state,
                    myProducts: [...state.fProducts].sort((a, b) => {
                        return new Date(b.uploaded_at) - new Date(a.uploaded_at)
                    })
                }
            } else if (action.sort == "pop") {
                return {
                    ...state,
                    myProducts: [...state.fProducts].sort((a, b) => {
                        return b.liked_by.length - a.liked_by.length
                    })
                }
            }
        case "SORT_PRODUCTS":
            if (action.sort == "date") {
                return {
                    ...state,
                    myProducts: [...state.myProducts].sort((a, b) => {
                        return new Date(b.uploaded_at) - new Date(a.uploaded_at)
                    })
                }
            } else if (action.sort == "pop") {
                return {
                    ...state,
                    myProducts: [...state.myProducts].sort((a, b) => {
                        return b.liked_by.length - a.liked_by.length
                    })
                }
            }
        case "OPEN_DETAILS":
            const currentDetails = state.allProducts.filter((u) => {
                return u.product_id == action.id
            })
            return {
                ...state,
                currentProduct: {
                    details: currentDetails,
                    whom: action.whom,
                    which: action.which
                }
            }
        case "OPEN_OUTDETAILS":
            const currentOutDetails = state.allProducts.filter((u) => {
                return u.product_id == action.id
            })
            return {
                ...state,
                currentOutProduct: {
                    details: currentOutDetails,
                    whom: action.whom,
                    which: action.which
                }
            }
        case "CLOSE_DETAILS":
            return {
                ...state,
                currentProduct: {}
            }
        case "CLOSE_OUTDETAILS":
            return {
                ...state,
                currentOutProduct: {}
            }
        case "SET_COPYSTATE": 
            return {
                ...state,
                copyState: action.copyState
            }
        case "REFRESH": 
        return {
            ...state,
            refresh: state.refresh +1 
        }
        default:
            return state
    }
}

export default searchReducer