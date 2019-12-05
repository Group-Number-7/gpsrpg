import React from 'react';
import useGlobalHook from 'use-global-hook';
import Axios from 'axios';
import constants from '../config/constants';
import auth from '@react-native-firebase/auth';
 
const initialState = {
    pos: {
        latitude: 0,
        longitude: 0,
    },
    stats: {
        hp: 0,
        def: 0,
        mana: 0,
        magic: 0,
        res: 0,
        attack: 0
    },
    calcStats: {
        hp: 0,
        def: 0,
        mana: 0,
        magic: 0,
        res: 0,
        attack: 0  
    },
    currentStats: {
        hp: 0,
        def: 0,
        mana: 0,
        magic: 0,
        res: 0,
        attack: 0
    },
    level: 0,
    exp: 0,
    expToNextLevel: 500,
    loggedIn: false,
    username: "",
    equippedEquipment: [{}],
    userId: ""
}
 
const actions = {
  setPos: (store, value) => {
      store.setState({...store, pos: value})
  },
  logout: (store) => {
      auth().signOut()
      store.setState(initialState)
  },
  login: (store, {email, cb}) => {
      Axios.get(`${constants.server_add}/users/login/${email}`)
        .then(({data})=>{
            if(data.status === 1){
                const equipped = Object.assign({}, ...data.user.equipment.map((eq)=>{
                    return ({[eq.type]:eq})
                }));
                let calcStats = {}
                Object.keys(store.state.stats).map((stat, i) => {
                    calcStats[stat] = data.user.stats[stat] + Object.keys(equipped).reduce((prev, curr, i)=>{return prev + equipped[curr].calcStats[stat]}, 0)
                })
                store.setState({                    
                    ...store, 
                    loggedIn: true, 
                    username: data.user.username,
                    level: data.user.level,
                    exp: data.user.experience,
                    stats: data.user.stats,
                    currentStats: calcStats, 
                    equippedEquipment: equipped,
                    calcStats: calcStats,
                    userId: data.user._id
                })
                cb();
            } else{
                //TODO show error message, pop up or something
                cb("Error retrieving user info")
            }
        }).catch((err)=>{
            console.log("err", err.message);
            cb("Unable to connect to Server")
        })
  },
  signup: (store, {email, username, nav}) => {
      Axios.post(`${constants.server_add}/users/signup`, {
          email: email,
          username: username
      }).then(({data})=> {
          if(data.status === 1){
                const equipped = Object.assign({}, ...data.user.equipment.map((eq)=>{
                    return ({[eq.type]:eq})
                }));
                let calcStats = {}
                Object.keys(store.state.stats).map((stat, i) => {
                    calcStats[stat] = data.user.stats[stat] + Object.keys(equipped).reduce((prev, curr, i)=>{return prev + equipped[curr].calcStats[stat]}, 0)
                })
                store.setState({
                    ...store, 
                    loggedIn: true, 
                    username: username,
                    level: data.user.level,
                    exp: data.user.experience,
                    stats: data.user.stats,
                    currentStats: calcStats,
                    equippedEquipment: equipped,
                    calcStats: calcStats,
                    userId: data.user._id
                })
                nav()
            } else{
                //TODO show error message, pop up or something
                console.log("check internet connection")
            }
      })
    },
    getNewEquipment: (store, name) => {
        Axios.post(`${constants.server_add}/equipment/new`, {
            name: name,
            userId: store.state.userId
        }).catch((err)=>{
            console.log("err adding item", err)
        })
    },
    equip: (store, eqId, type) => {
        Axios.put(`${constants.server_add}/equipment/equip/${store.state.userId}/${eqId}/${type}`).then(({data})=>{
            console.log("res", data)
            let equipped = {
                ...store.state.equippedEquipment,
                [type]: data
            }
            let calcStats = {}
            Object.keys(store.state.stats).map((stat, i) => {
                calcStats[stat] = store.state.stats[stat] + Object.keys(equipped).reduce((prev, curr, i)=>{return prev + equipped[curr].calcStats[stat]}, 0)
            })
            store.setState({
                ...store,
                equippedEquipment: equipped,
                currentStats: calcStats,
                calcStats: calcStats
            })
        })
    },
    addExp: async (store, amount) => {
        let n_exp = store.state.exp + amount
        if(n_exp < 500){
            store.setState({
                ...store,
                exp: n_exp
            })
            await Axios.post(`${constants.server_add}/users/level/${store.state.userId}`, {
                level: store.state.level,
                exp: n_exp
            })
        } else {
            let lvl = store.state.level
            store.setState({
                ...store,
                exp: 0,
                level: store.state.level + 1
            })
            await Axios.post(`${constants.server_add}/users/level/${store.state.userId}`, {
                level: lvl + 1,
                exp: 0
            })
        }
    },
    setHP: (store, newLife) => {
        store.setState({
            ...store,
            currentStats: {
                ...store.state.currentStats,
                hp: newLife
            }
        })
    },
    resetStats: (store) => {
        store.setState({
            ...store,
            currentStats: store.state.calcStats
        })
    }
};

export default useGlobalState = useGlobalHook(React, initialState, actions);