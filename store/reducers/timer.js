

const timer = (state = {}, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + action.payload }

        case "SET_DATE":
            return { ...state, date: action.payload }
        // = { date: state. + action.payload }
    }
    return state
}


export default timer

