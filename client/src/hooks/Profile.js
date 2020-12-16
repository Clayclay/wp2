import React , {useState,useEffect,useContext}  from 'react';
import { authContext } from "../App";
import {  useParams, Link } from 'react-router-dom';

import Album from './Album';
import AvatarUser from './AvatarUser';
import Lang from './Lang';

import { makeStyles } from '@material-ui/core/styles';

import PlaceIcon from '@material-ui/icons/Place';

import ChatIcon from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';
import BlockUser from './BlockUser/BlockUser';


import { initialState } from "../store/reducers/auth_reducer";

import Container from '@material-ui/core/Container';

/* UUID FOR CHATID*/
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
  
}));

const initState = {
  userProfile: [],
  isFetching: false,
  hasError: false
};

const Profile = () => {
  const classes = useStyles();

  const { state: authState , dispatch } = useContext(authContext);
  const id = authState.user._id;
  const [user, setUser] = useState(initialState);

  const [userProfile, setUserProfile] = useState(initState);

  const [room,setRoom] = useState('');
  
  let params = useParams();
  const idProfile = params.id ;

  //Check if a room Id is already available
  useEffect(()=>{
    console.log(id,idProfile)
     /*  STEP 1 */
   fetch (`http://localhost:5000/api/room/${id}&${idProfile}` ,{ 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authState.token}`
    },
})
.then(res =>  { 
if (res.ok) {
  return res.json();
} else {
  throw res;
}
})  
.then(resJson => {
console.log(resJson)
setRoom(resJson.roomid); 
})
.catch(error => {
console.error("room not found",error);
setRoom(uuidv4())
})  
},  [ ]);

console.log("room",room)
  
        useEffect(() => {
          fetch(`http://localhost:5000/api/user/${idProfile}`, {
            method: "GET",
            headers: {  }
          })
          .then(res => {
              if (res.ok) {
                //console.log('res',res)
                return res.json();
              } else {
                throw res;
              }
            })
            .then(resJson => {
             setUserProfile(  resJson );
            })
            .catch(error => {
              console.log(error);
            });
            
        },[idProfile,authState.token]);



      return(
        
        <Container>
          {userProfile.isFetching ? (
            <span className="loader">LOADING...</span>
          ) : userProfile.hasError ? (
            <span className="error">AN ERROR HAS OCCURED</span>
          ) : (
            <>
             <AvatarUser  avatar={userProfile.avatar} nickname={userProfile.nickname} online={userProfile.online} /> 
             <h3>{userProfile.nickname}</h3>
              <PlaceIcon/>{userProfile.city}               
               <p>{userProfile.gender} {userProfile.age} y.o</p> 
About: {userProfile.description}

Speak :               {userProfile.languages && 
        userProfile.languages.map(language => (            
          <Lang key={language._id.toString()} language={language} />
          ))}


              {userProfile.albums && userProfile.albums.map(album => {
           return <Album key={album._id.toString()} album={album} />
        })}

        
            <Link onClick={ e => (!userProfile._id) ? e.preventDefault() : null} to={`/chat/${room}/${userProfile._id}`}>
              {/* as no first message random id*/}
              <Button   startIcon={<ChatIcon/>}  className={classes.button} variant="contained"   color="default">
                Message
              </Button >
            </Link> 

            
<BlockUser    userId={userProfile._id} id={authState.user._id} />


            </>
          )}
          
          </Container>
    );
};
export default Profile;



