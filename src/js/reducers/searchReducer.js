const searchReducer = (state = {
    search: "",
    submit: "",
    allProducts: [],
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
        default:
            return state
    }
}

export default searchReducer