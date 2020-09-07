import React , {useState,useEffect,useContext}  from 'react';
import { authContext } from "../App";
import {  useParams } from 'react-router-dom';

import Album from './Album';


const initialState = {
  user: [],
  isFetching: false,
  hasError: false
};

const Profile = () => {

const { state: authState } = useContext(authContext);

const [user, setUser] = useState(initialState);

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
       
            console.log(user);

      return(
        
        <div className="container">
          {user.isFetching ? (
            <span className="loader">LOADING...</span>
          ) : user.hasError ? (
            <span className="error">AN ERROR HAS OCCURED</span>
          ) : (
            <>

              <p>{user.nickname}</p>
              <p>{user.email}</p>
               <p>{user.age} </p> 
               <p>{user.city} </p>  
               <p>{user.gender}</p>   
               <p>avatar : {user.avatar} </p> 
               <p>langues : </p>


              {user.albums && user.albums.map(album => {
           return <Album key={album._id.toString()} album={album} />
        })}
               
            </>
          )}
          
        </div>
    );
};
export default Profile;


