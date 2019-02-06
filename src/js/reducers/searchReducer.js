const searchReducer = (state = {
    search: "",
    submit: "",
    allProducts: [],
    myProducts: []
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
            return {
                ...state,
                allProducts: [...action.allProducts]
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
        default:
            return state
    }
}

export default searchReducer