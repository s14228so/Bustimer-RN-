

const timer = (state = {}, action) => {
    switch (action.type) {
        case "COUNT_DOWN":
            return { ...state, m: state.m, s: state.s }
        case "SET_DATE":
            return { ...state, date: action.payload }
        // = { date: state. + action.payload }
    }
    return state
}


export default timer

