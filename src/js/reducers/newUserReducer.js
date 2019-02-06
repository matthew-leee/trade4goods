const newUserReducer = (state = {
    nav: {
        MyProf: true,
        MyG: false,
        FollowedG: false,
        Upload: false
    },
    imgHover: false
}, action) => {
    switch (action.type) {
        case "NAV":
            const cloneNav = Object.assign({}, state.nav)
            for (let key in cloneNav) {
                if (key == action.tag) {
                    cloneNav[key] = true
                } else {
                    cloneNav[key] = false
                }
            }
            return {
                ...state,
                nav: cloneNav
            }
        case "IMG_HOVER":
            return {
                ...state,
                imgHover: !state.imgHover
            }
        default:
            return state
    }
}

export default newUserReducer