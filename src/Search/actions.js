const actions = {
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
    }
}

export default actions