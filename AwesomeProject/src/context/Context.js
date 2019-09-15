import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

const initialState = {
    test: "no context",
    stats: {
        hp: 100,
        def: 100,
        mana: 100,
        mag: 100,
        res: 100,
    },
    currentStats: {
        hp: 50,
        def: 100,
        mana: 60,
        mag: 100,
        res: 100
    },
    level: 1,
    exp: 0,
    expToNextLevel: 100
}
export const StateProvider = ({reducer, children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);