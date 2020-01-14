const setting = (state = {}, action) => {
    switch (action.type) {
        case "SET_DEST":
            console.log("SET_DEST:", action.payload)
            return action.payload
        default:
            return state
    }
}

export default setting