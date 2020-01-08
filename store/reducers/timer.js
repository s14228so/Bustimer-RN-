

const timer = (state = {}, action) => {
    switch (action.type) {
        case "COUNT_DOWN":
            return { ...state, ms: action.payload }
        case "SET_DATE":
            return { ...state, date: action.payload }
    }
    return state
}


export default timer

