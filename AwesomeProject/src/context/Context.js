import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

const initialState = {
    pos: {
        latitude: 0,
        longitude: 0,
    },
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
        mana: 30,
        mag: 100,
        res: 100
    },
    level: 1,
    exp: 10,
    expToNextLevel: 100,
    loggedIn: false,
    userName: "billybobjonameislong243"
}
export const StateProvider = ({reducer, children}) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);