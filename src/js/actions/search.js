const actions_search = {
    storeSearch: (value) => {
        return {
            type: "STORE_SEARCH",
            search: value
        }
    },
    submitSearch: () => {
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
    setMyProducts: (id) => {
        return {
            type: "SET_MY_PRODUCTS",
            id: id
        }
    },
    setFProducts: (id) => {
        return {
            type: "SET_F_PRODUCTS",
            id: id
        }
    },
    sortProducts: (sort) => {
        return {
            type: "SORT_PRODUCTS",
            sort: sort
        }
    },
    sortFProducts: (sort) => {
        return {
            type: "SORT_FPRODUCTS",
            sort: sort
        }
    },
    openDetails: (id, whom, which)=>{
        return {
            type: "OPEN_DETAILS",
            id, whom, which
        }
    },
    closeDetails: ()=>{
        return {
            type: "CLOSE_DETAILS"
        }
    }
}

export default actions_search