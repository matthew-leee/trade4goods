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
    filterMyProducts: (id) => {
        return {
            type: "FILTER_MY_PRODUCTS",
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
    },
    openOutDetails: (id, whom, which)=>{
        return {
            type: "OPEN_OUTDETAILS",
            id, whom, which
        }
    },
    closeOutDetails: ()=>{
        return {
            type: "CLOSE_OUTDETAILS"
        }
    },
    setCopyState: (copyState) => {
        return{
            type: "SET_COPYSTATE",
            copyState: copyState
        }
    }
}

export default actions_search