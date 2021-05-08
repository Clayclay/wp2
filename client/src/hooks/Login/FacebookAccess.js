import React , { useState , useContext} from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

import * as ACTION_TYPES from '../../store/actions/action_types';
import { authContext } from "../../App";
import { set } from 'mongoose';
import Register from '../Register/Register';


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

    const [fcbUser, setfcbUser] = useState()

console.log(
'GLobal CONST fbLogin', loginState,
'isfbinitialized',isFbSDKInitialized,
'accesstoken',fbUserAccessToken,
'fcbUser',fcbUser,
'register',isRegister
);
   
//callback change only if one input change
    const logInToFB = React.useCallback(() => {

      window.FB.login(function(response) {
        console.log("step 1 login",response);
        setFbUserAccessToken(response.authResponse.accessToken);
     }, {scope: 'public_profile,email'});
 
    }, []);

    const logOutOfFB = React.useCallback(() => {
      window.FB.logout(() => {
        setFbUserAccessToken(null); 
        deleteCookie("fblo_" + facebookAppId); 
      });
    }, []);

    React.useEffect(()=>{
        if(isFbSDKInitialized){

            window.FB.getLoginStatus((response)=>{
            setLoginState(response)    
            });

            window.FB.api('/me', {fields: 'first_name,last_name,email'}, function(response) {
              console.log("step 2 api /me ",JSON.stringify(response));
              setfcbUser(response)
            }); 
        }

        if(fcbUser !== undefined ){
          
          fetch (`/api/fcbuser/${fcbUser.email}` ,{ 
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


        if( isRegister !== undefined && fcbUser )
          {   history.push({  
            pathname:'/fcbRegister' ,
            state: {   email: fcbUser.email   }
          })   }
       
          


            
               

        
    },[isFbSDKInitialized,fbUserAccessToken,isRegister,fcbUser]);



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