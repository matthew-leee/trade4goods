
const userReducers = (state = {
    openModal: false,
}, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            if (state.openModal) {
                return {
                    ...state,
                    openModal: false
                }
            } else {
                return {
                    ...state,
                    openModal: true
                }
            }

        default:
            return state
    }
}

export default userReducers