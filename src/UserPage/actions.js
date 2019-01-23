const actions = {
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
    }
}

export default actions