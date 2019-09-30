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
    username: "test"
}
 
const actions = {
  setPos: (store, value) => {
      store.setState({...store, pos: value})
  },
  logout: (store) => {
      auth().signOut()
      store.setState({...store, loggedIn: false})
  },
  login: (store, {email, fbUid}) => {
      Axios.get(`${constants.server_add}/users/${fbUid}/${email}`)
        .then(({data})=>{
            console.log("data", data);
        })

      store.setState({...store, loggedIn: true})
  },
  signup: (store, {email, fbUid, username}) => {
      Axios.post(`${constants.server_add}/users/signup`, {
          email: email,
          fbUid: fbUid,
          username: username
      }).then(({data})=> {
          console.log("data", data)
      })
      store.setState({...store, loggedIn: true, username: username})
  }
};
 
export default useGlobalState = useGlobalHook(React, initialState, actions);