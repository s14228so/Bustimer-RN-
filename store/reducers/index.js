import { combineReducers } from "redux"
import bus from "./bus.js"
import timer from "./timer.js"

const rootReducer = combineReducers({
    bus,
    timer
})

export default rootReducer