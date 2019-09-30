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
    expToNextLevel: 0,
    loggedIn: false,
    username: ""
}
 
const actions = {
  setPos: (store, value) => {
      store.setState({...store, pos: value})
  },
  logout: (store) => {
      auth().signOut()
      store.setState(initialState)
  },
  login: (store, {email, nav}) => {
      Axios.get(`${constants.server_add}/users/${email}`)
        .then(({data})=>{
            console.log("data", data)
            if(data.status === 1){
                store.setState({                    
                    ...store, 
                    loggedIn: true, 
                    username: data.user.username,
                    level: data.user.level,
                    exp: data.user.experience,
                    stats: data.user.stats,
                    currentStats: data.user.stats, 
                })
                nav()
            } else{
                //TODO show error message, pop up or something
                console.log("check internet connection")
            }
        })
  },
  signup: (store, {email, username, nav}) => {
      Axios.post(`${constants.server_add}/users/signup`, {
          email: email,
          username: username
      }).then(({data})=> {
          console.log("data", data)
          if(data.status === 1){
                store.setState({
                    ...store, 
                    loggedIn: true, 
                    username: username,
                    level: data.user.level,
                    exp: data.user.experience,
                    stats: data.user.stats,
                    currentStats: data.user.stats
                })
                nav()
            } else{
                //TODO show error message, pop up or something
                console.log("check internet connection")
            }
      })
  }
};
 
export default useGlobalState = useGlobalHook(React, initialState, actions);