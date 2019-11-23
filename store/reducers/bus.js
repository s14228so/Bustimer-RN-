const bus = (state = {}, action) => {
    switch (action.type) {
        case "SET_FROM_TO":
            return { ...state, from: action.payload.from, to: action.payload.to }
        default:
            return { ...state, from: "sfc", to: "sho" }
    }
}

export default bus