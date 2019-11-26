import { combineReducers } from "redux"
import bus from "./bus"
import timer from "./timer"
import data from "./data"

const rootReducer = combineReducers({
    bus,
    timer,
    data,
})

export default rootReducer