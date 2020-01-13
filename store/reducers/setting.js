const setting = (state = {}, action) => {
    switch (action.type) {
        case "SET_DEST":
            return action.payload
        default:
            return state
    }
}

export default setting