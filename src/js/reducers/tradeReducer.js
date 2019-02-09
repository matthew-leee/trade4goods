const tradeReducer = (state = {
    openMyGoodModal: false,
    openOGModal: false,
    selected: "",
    currentTrade: {},
}, action) => {
    switch (action.type) {
        case "OPEN_MYGOOD_MODAL":
            return {
                ...state,
                openMyGoodModal: !state.openMyGoodModal
            }
        case "SELECT_MYGOOD":
            return {
                ...state,
                selected: action.selected
            }
        case "CLEAR_SELECT":
            return {
                ...state,
                selected: ""
            }
        case "OPEN_TRADECARDS":
            return {
                ...state,
                currentTrade: action.currentTrade
            }
        case "CLOSE_TRADECARDS": 
            return {
                ...state,
                currentTrade: {}
            }
        default:
            return state
    }
}

export default tradeReducer