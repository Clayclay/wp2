import React, { useEffect, useContext } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import {authContext} from '../App';
import * as ACTION_TYPES from '../store/actions/action_types';
import axios from 'axios';

/* SOCKET IO */
import io from 'socket.io-client';
let socket;

const LogOutTimer = () => {

  const {  state, dispatch }  = useContext(authContext);
  //const [isIdle, setIsIdle] = useState(false)

  const handleOnIdle = event => {
    
    //console.log('user is idle', event)
    //console.log('last active', new Date(getLastActiveTime() )  )
    //setIsIdle(true)

    axios.get('http://localhost:3000/api/logout')
              .then(()=>
              socket.emit('logout',{userId: state.user._id})
              )
              .then(() =>
              dispatch({ type: ACTION_TYPES.LOGOUT })
              )
               
  }
  
  const handleOnActive = event => {
    //console.log('user is active', event)
    //console.log('time remaining', getRemainingTime() / 1000  )
    //setIsIdle(false)
    
  }

  const handleOnAction = (e) => {
    //console.log('user did something', e, getRemainingTime() / 1000   ) 
  }

 
  /* SOCKET IO */ 
  const ENDPOINT = 'http://localhost:5000';
  useEffect(() => {
    socket = io(ENDPOINT); 
    
      // room and message need to be init BEFORE 
  socket.emit('login',{userId: state.user._id})
  return ()=>{
    socket.emit('logout',{userId: state.user._id})
  }
  }, [ENDPOINT,state.user._id]);

/*const { getRemainingTime, getLastActiveTime  } = */useIdleTimer({
  timeout: 1000 * 60 * 15,
  onIdle: handleOnIdle,
  onActive: handleOnActive,
  onAction: handleOnAction,
  debounce: 500
})



  return (

    <div>
     
      </div>
  );
 };
export default LogOutTimer;