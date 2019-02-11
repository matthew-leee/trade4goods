const actions_newUserPage = {
    handleNav: (tag)=> {
        return {
            type: "NAV",
            tag: tag
        }
    },
    imgHover: ()=>{
        return {
            type: "IMG_HOVER"
        }
    },
    updatePropic: ()=>{
        return {
            type: "UPDATE_PROPIC"
        }
    },
    closePropic: ()=>{
        return {
            type: "CLOSE_PROPIC"
        }
    }
}

export default actions_newUserPage