
const userReducer = (state = {
    products: [],
    result: "",
    users: [],
    comment: "",
    openMGModal: false,
    openFPModal: false,
    openSQModal: false,
    openRQModal: false,
    openUploadModal: false,
    otherUser: "",
    myUser: {},
}, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            switch (action.column) {
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
                    u.openOneModal = !u.openOneModal
                    return u
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
        case "STORE_USERS":
            const users = action.users
            return {
                ...state,
                users: [...users]
            }
        case "OPEN_UPLOADMODAL":
            return {
                ...state,
                openUploadModal: !state.openUploadModal
            }
        case "SHOW_OTHERUSER":
            return {
                ...state,
                otherUser: action.otherUser
            }
        case "SET_COMMENT":
            return {
                ...state,
                comment: action.comment,
            }
        case "SUBMIT_COMMENT":
            return {
                ...state,
                comment: ""
            }
        case "CLOSE_OTHERUSER":
            return {
                ...state,
                otherUser: ""
            }
        case "STORE_MYUSER":
            return {
                ...state,
                myUser: action.myUser
            }
        default:
            return state
    }
}

export default userReducer