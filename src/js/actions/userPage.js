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
    storeUser: (user) => {
        return {
            type: "STORE_USER",
            user: user
        }
    },
    openUploadModal: () => {
        return {
            type: "OPEN_UPLOADMODAL"
        }
    }
}

export default actions_userPage