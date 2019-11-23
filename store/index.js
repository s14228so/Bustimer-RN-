import React, { useReducer } from 'react'
import reducer from './reducers'


const Store = React.createContext()

const initialState = {
    bus: {
        nextBuses: [],
        from: "sfc",
        to: "sho"
    },
    timer: {
        count: 0,
        date: {},
        m: "",
        s: ""
    },
    data: {
        timeTable: {},
        holidays: []
    }
}

const Provider = ({ children }) => {
    console.log("provider")
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export { Store, Provider }