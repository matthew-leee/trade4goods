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
    },
    setMyProducts:(id)=>{
        return {
            type: "SET_MY_PRODUCTS",
            id: id
        }
    },
    sortProducts:(sort)=>{
        return {
            type: "SORT_PRODUCTS",
            sort: sort
        }
    }
}

export default actions_search