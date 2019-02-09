const actions_trade = {
    openMyGoodModal: (id) => {
        return {
            type: "OPEN_MYGOOD_MODAL",
            mgID: id
        }
    },
    openOGModal: (id) => {
        return {
            type: "OPEN_OG_MODAL",
            ogID: id
        }
    },
    openDELModal: (id) => {
        return {
            type: "OPEN_DEL_MODAL",
            delID: id
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
    },
    openTradeCards: (details, status) => {
        return {
            type: "OPEN_TRADECARDS",
            currentTrade: {
                details, status
            }
        }
    },
    closeTradeCards: () => {
        return {
            type: "CLOSE_TRADECARDS"
        }
    }
}

export default actions_trade