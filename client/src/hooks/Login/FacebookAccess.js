import React , { useState , useContext} from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

import * as ACTION_TYPES from '../../store/actions/action_types';
import { authContext } from "../../App";

function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const useStyles = makeStyles((theme) => ({
 fcb: {
    margin: theme.spacing(1),

    background: '#4267b2',
    color: 'white',
    height: '40px',
    width: '250px',


  },
  
}));


const FacebookAccess = ( ) => {
    const classes = useStyles();
    const {   dispatch  }  = useContext(authContext);
    const isFbSDKInitialized = useInitFacebookSDK();
    const [loginState,setLoginState]  = useState();
    const [fbUserAccessToken, setFbUserAccessToken] = useState();
    const facebookAppId = "281271229627551";

    let history = useHistory();
    let [error, setError] = React.useState(null);
    const [isRegister, setisRegister] = useState();
    const [fcbEmail, setfcbEmail] = useState();

//
//setFbUserAccessToken(response.authResponse.accessToken); 
//callback change only if one input change

    const logInToFB = React.useCallback(() => {
      window.FB.login(function(response) {
        setLoginState(response) 
     }, {scope: 'public_profile,email'});
    }, []);

    const logOutOfFB = React.useCallback(() => {
      window.FB.logout(() => {
        setLoginState(null)
        deleteCookie("fblo_" + facebookAppId); 
      });
    }, []);

console.log('isfbinitialized',isFbSDKInitialized,
"fcbEmail", fcbEmail);

React.useEffect(()=>{

  if(isFbSDKInitialized){
    window.FB.getLoginStatus(function(response) {
      setLoginState(response)   

      if (response.authResponse) {
        setFbUserAccessToken(response.authResponse.accessToken)
        window.FB.api('/me', {fields: 'first_name,last_name,email'}, function(response) {
          setfcbEmail(response.email);   
          
          if(response.email !== undefined ){
            console.log( 'email',response.email);
            fetch (`/api/fcbuser/${response.email}` ,{ 
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(res => {  
              if (res.ok) {  return res.json(); }
                throw res;   
            })
            .then(resJson => {
              console.log("step 3 user register ? ",resJson);  
              setisRegister(resJson)
              dispatch({ 
                    type: ACTION_TYPES.LOGIN_SUCCESS,
                    payload: resJson
              })
            })
            .catch(error => {
              console.log("dans erreur")
            console.error(error);
            setError(error)
            }); 
          }else{}
            

        })
      }else{console.log('User cancelled login or did not fully authorize.'); }
    }, {scope: 'email,user_likes'});
  }
  else{}



},[isFbSDKInitialized,loginState]);

/*
    React.useEffect(()=>{

      console.log('Loginstate', loginState);
      
      if (fcbEmail !== undefined )  {
        fetch (`/api/fcbuser/${fcbEmail}` ,{ 
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              },
            })
            .then(res => {  
              if (res.ok) {  return res.json(); }
                throw res;   
            })
            .then(resJson => {
              console.log("step 3 user register ? ",resJson);  
              setisRegister(resJson)
              dispatch({ 
                    type: ACTION_TYPES.LOGIN_SUCCESS,
                    payload: resJson
              })
            })
            .catch(error => {
            console.error(error);
            setError(error)
            }); 
            
        }
        else if (  isRegister == undefined){
          console.log("go to register")
            history.push({  
              pathname:'/fcbRegister' ,
              state: {   email: fcbEmail  }
            })  
        }
        else{}

      

      
       
      }
    
       
    },[fcbEmail]);

*/

return (

<div>

{fbUserAccessToken ? (
          <Button onClick={logOutOfFB} className={classes.fcb}>
            Log out
          </Button>
        ) : (
          <Button onClick={logInToFB} className={classes.fcb}>
            Login with Facebook
          </Button>
        )}
</div>

);

}

export default FacebookAccess;