import React, { useEffect, useState, useContext } from  'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css';

import {authContext} from '../../App';

let socket;


const Chat = ({location}) => {

    const {  authState  }  = useContext(authContext);
    const name = authState.user.nickname;

    const ENDPOINT = 'http://localhost:5000' ;
    //const  [ name,   setName] = useState('');
    const  [ room,   setRoom] = useState('');
    const [users, setUsers] = useState('');
    const  [ message, setMessage] = useState('');
    const  [ messages, setMessages] = useState([]);

    useEffect(() => {

        const {room} = queryString.parse(location.search);
        /* get the url with room and name inside back */
       
        socket = io(ENDPOINT); 
           
        setRoom(room); 
        //setName(state.user.nickname);
        

        //console.log(socket); 
        socket.emit('join',{name,room}, (error) => {
            if(error){
                alert(error);
            }
        });
    }, [ENDPOINT,location.search, name]);

    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        }); 
       socket.on('roomData', ({ users }) => {
        setUsers(users);
      });
    }, []);
  

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();
        // for not refreshing the all page again and afain
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return(
        // Main component with a lot of data so we gonna create a separate file
        <div className="outerContainer">
            <div className="container">
               {/*how to get the roomname dynamicly ? 
               we have a room propriety in chat.js*/}
                <InfoBar room={room}/>
                {/* need messages proprieties */}
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            </div>
            <TextContainer users={users}/>
        </div>
    );
}

export default Chat;