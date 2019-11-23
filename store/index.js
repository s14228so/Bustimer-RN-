import React, { useReducer } from 'react'
import reducer from './reducers'


const Store = React.createContext()

const initialState = {
    bus: {
        nextBuses: [],
        fromTo: {

        }
    },
    timer: {
        count: 0,
        date: {},
        ms: {}
    },
    data: {
        timeTable: null,
        holidays: []
    }
}

// 配列だけいけてる

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export { Store, Provider }