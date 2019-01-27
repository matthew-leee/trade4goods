const actions_userPage = {
    openModal: ()=>{
        return {
            type: "OPEN_MODAL"
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
    }
}

export default actions_userPage