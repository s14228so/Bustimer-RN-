const setting = (state = {}, action) => {
    console.log(action)
    switch (action.type) {
        case "SET_DEST":
            return action.payload
        default:
            return state
    }
}

export default setting