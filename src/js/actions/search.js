const actions_search = {
    storeSearch: (value)=>{
        return {
            type: "STORE_SEARCH",
            search: value
        }
    },
    submitSearch: () =>{
        return {
            type: "SUBMIT_SEARCH"
        }
    },
    storeAllProducts: (products) => {
        return {
            type: "STORE_ALL_PRODUCTS",
            allProducts: products
        }
    }
}

export default actions_search