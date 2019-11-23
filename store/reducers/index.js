import { combineReducers } from "redux"
import bus from "./bus.js"
import timer from "./timer.js"
import data from "./data.js"

const rootReducer = combineReducers({
    bus,
    timer,
    data
})

export default rootReducer