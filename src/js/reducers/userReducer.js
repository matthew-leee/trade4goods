
const userReducer = (state = {
    products: [],
    result: "",
    user: [],
    openMGModal: false,
    openFPModal: false,
    openSQModal: false,
    openRQModal: false,
    openUploadModal: false
}, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
        switch(action.column){
            case "MG": 
            return {
                ...state, 
                openMGModal: !state.openMGModal
            }
            case "FP": 
            return {
                ...state, 
                openFPModal: !state.openFPModal
            }
            case "SQ": 
            return {
                ...state, 
                openSQModal: !state.openSQModal
            }
            case "RQ": 
            return {
                ...state, 
                openRQModal: !state.openRQModal
            }
            default: 
            return state
        }
        case "FETCH_PRODUCTS":
            return {
                ...state,
                products: action.products
            }
        case "OPEN_ONE_MODAL":
            const newProducts = state.products.map((u) => {
                if (u.product_id == action.id) {
                    if (u.openOneModal) {
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
        case "STORE_USER":
        const user = action.user
            return {
                ...state,
                user: [...user]
            }
        case "OPEN_UPLOADMODAL":
            return {
                ...state, 
                openUploadModal: !state.openUploadModal
            }
        default:
            return state
    }
}

export default userReducer