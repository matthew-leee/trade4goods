
const userReducer = (state = {
    openModal: false,
    products: [],
    result: ""
}, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            if (state.openModal) {
                return {
                    ...state,
                    openModal: false
                }
            } else {
                return {
                    ...state,
                    openModal: true
                }
            }
        case "FETCH_PRODUCTS":
            return {
                ...state, 
                products: action.products
            }
        case "OPEN_ONE_MODAL":
            const newProducts = state.products.map((u)=>{
                if (u.product_id == action.id){
                    if (u.openOneModal){
                        u.openOneModal = false
                        return u
                    } else {
                        u.openOneModal = true
                        return u
                    }
                } else {
                    return u
                }
            })
            return {
                ...state,
                products: newProducts
            }
        case "SAVE_SEARCH":
            return {
                ...state,
                result: action.result
            }
        default:
            return state
    }
}

export default userReducer