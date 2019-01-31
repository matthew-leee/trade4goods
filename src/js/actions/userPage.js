const actions_userPage = {
    openModal: (column)=>{
        return {
            type: "OPEN_MODAL",
            column: column
        }
    },
    fetchProducts: (products)=>{
        return {
            type: "FETCH_PRODUCTS",
            products: products
        }
    },
    openOneModal: (id) =>{
        return {
            type: "OPEN_ONE_MODAL",
            id: id
        }
    },
    FORCEopenOneModal: (id) =>{
        return {
            type: "FORCE_OPEN_ONE_MODAL",
            id: id
        }
    },
    saveSearch: (result)=>{
        return {
            type: "SAVE_SEARCH",
            result: result
        }
    },
    clearSearch: () =>{
        return {
            type: "CLEAR_SEARCH"
        }
    },
    openUploadModal: () => {
        return {
            type: "OPEN_UPLOADMODAL"
        }
    },
    showOtherUser: (user) => {
        return {
            type: "SHOW_OTHERUSER", 
            otherUser: user
        }
    },
    closeOtherUser: () => {
        return {
            type: "CLOSE_OTHERUSER",
        }
    },
    setComment: (input) => {
        return {
            type: "SET_COMMENT",
            comment: input
        }
    },
    submitComment: (user) => {
        return {
            type: "SUBMIT_COMMENT",
            user: user
        }
    },
    storeMyUser: (user) => {
        return {
            type: "STORE_MYUSER",
            myUser: user
        }
    },
    storeAllUsers: (allUsers) => {
        return {
            type: "STORE_ALLUSERS",
            allUsers: allUsers
        }
    },
    storeAllComments: (comments, id) => {
        return {
            type: "STORE_ALLCOMMENTS", 
            comments: comments,
            product_id: id
        }
    }
}

export default actions_userPage