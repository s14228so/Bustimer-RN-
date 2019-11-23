const bus = (state = {}, action) => {


    switch (action.type) {
        case "SET_FROM_TO":
            return { ...state, fromTo: action.payload }
        case "SET_BUSES":
            return { ...state, nextBuses: action.payload }
        default:
            return state
    }
}

export default bus