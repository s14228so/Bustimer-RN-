const data = (state = {}, action) => {
    switch (action.type) {
        case "SET_TIMETABLE":
            return { ...state, timeTable: action.payload }
        case "SET_HOLIDAYS":
            return { ...state, holidays: action.payload }
        default:
            return state
    }
}

export default data