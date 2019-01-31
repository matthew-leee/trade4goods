const actions_trade = {
    openMyGoodModal: () => {
        return {
            type: "OPEN_MYGOOD_MODAL"
        }
    },
    openOGModal: (id) => {
        return {
            type: "OPEN_OG_MODAL",
            ogID: id
        }
    },
    selectMyGood: (id) => {
        return {
            type: "SELECT_MYGOOD",
            selected: id
        }
    },
    clearSelect: () => {
        return {
            type: "CLEAR_SELECT"
        }
    }
}

export default actions_trade