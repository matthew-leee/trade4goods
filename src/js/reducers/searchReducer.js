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
                    u.openOneModal = !u.openOneModal
                    return u
                } else {
                    return u
                }
            })
            return {
                ...state,
                allProducts: newProducts
            }
        default:
            return state
    }
}

export default searchReducer