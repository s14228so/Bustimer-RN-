import React, { useReducer } from 'react'
import reducer from './reducer'

const initialState = {
    count: 0
}

const Store = React.createContext()

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export { Store, Provider }