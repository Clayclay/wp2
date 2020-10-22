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


const useStyles = makeStyles((theme) => ({
}));

const initialState = {
  user: [],
  isFetching: false,
  hasError: false
};

const Profile = () => {

const { state: authState } = useContext(authContext);

const [user, setUser] = useState(initialState);
const classes = useStyles();
let params = useParams();
const id = params.id ;
      
        useEffect(() => {
          fetch(`http://localhost:5000/api/user/${id}`, {
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
             setUser(  resJson );
            })
            .catch(error => {
              console.log(error);
            });
            
        },[id,authState.token]);

      return(
        
        <div className="container">
          {user.isFetching ? (
            <span className="loader">LOADING...</span>
          ) : user.hasError ? (
            <span className="error">AN ERROR HAS OCCURED</span>
          ) : (
            <>
             <AvatarUser  avatar={user.avatar} /> 
             <h3>{user.nickname}</h3>
              <PlaceIcon/>{user.city}               
               <p>{user.gender} {user.age} y.o</p> 
About: {user.description}

Speak :               {user.languages && 
        user.languages.map(language => (            
          <Lang key={language._id.toString()} language={language} />
          ))}


              {user.albums && user.albums.map(album => {
           return <Album key={album._id.toString()} album={album} />
        })}

        
            <Link onClick={ e => (!user._id) ? e.preventDefault() : null} to={`/chat/${user._id}`}>
              <Button   startIcon={<ChatIcon/>}  className={classes.button} variant="contained"   color="default">
                Message
              </Button >
            </Link> 

            <BlockUser    userId={user._id}  />
               
            </>
          )}
          
        </div>
    );
};
export default Profile;


