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
    }
}

export default actions_newUserPage