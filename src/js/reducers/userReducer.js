
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
    allUsers: [],
    allComments: []
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
        case "STORE_ALLUSERS":
            return {
                ...state,
                allUsers: action.allUsers
            }
        case "STORE_ALLCOMMENTS":
            const present = state.allComments
                .some((u) => { return u.product_id == action.product_id })

            if (present) {
                const amendComments = state.allComments
                    .filter((u) => { return u.product_id == action.product_id }).map((u) => {
                        u.comments = action.comments
                        return u
                    })
                return {
                    ...state,
                    allComments: [...amendComments]
                }
            } else {
                const newComments = {
                    product_id: action.product_id,
                    comments: action.comments
                }
                return {
                    ...state,
                    allComments: [...state.allComments, newComments]
                }
            }
        case "DEL_MYUSER":
            return {
                ...state,
                myUser: {}
            }
        default:
            return state
    }
}

export default userReducer
