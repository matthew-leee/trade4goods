const searchReducers = (state = {
    search: "",
    submit: ""
}, action) => {
    switch (action.type) {
        case "STORE_SEARCH":
            return {
                ...state,
                search: action.search
            }
        case "SUBMIT_SEARCH":
        const submit = state.search
            return {
                ...state,
                submit: submit,
                search: ""
            }
        default:
            return state
    }
}

export default searchReducers