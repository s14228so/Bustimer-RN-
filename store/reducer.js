const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        case 'SET_DATE':
            console.log(action.day)
            return {
                ...state,
                date: action.day
            }
        default:
            return state
    }
}

export default reducer