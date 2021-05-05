import React , { useState } from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

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
    const isFbSDKInitialized = useInitFacebookSDK();
    const [loginState,setLoginState]  = useState();
    const [fbUserAccessToken, setFbUserAccessToken] = useState();
    const facebookAppId = "281271229627551";

    let history = useHistory();

    let [error, setError] = React.useState(null);


console.log(
'fbLogin', loginState,
'isfbinitialized',isFbSDKInitialized,
'accesstoken',fbUserAccessToken
);
   
//callback change only if one input change
    const logInToFB = React.useCallback(() => {

      window.FB.login(function(response) {
        console.log("response :: pour login",response);
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
              console.log("api Me",JSON.stringify(response));

              fetch (`/api/userfcb/` ,{ 
                method: "GET",
                headers: {},
                body: JSON.stringify({         
                  email: response.email,
                })
              })
              .then(res => {
                if (res.ok) {
                  return res.json();
                  }
                  throw res;   
              })
              .then(resJson => {
                alert("user fin result",resJson);

                
              })
              .catch(error => {
              console.error(error);
              }); 
              
/*
              history.push({  
                pathname:'/fcbRegister' ,
                state: { 
                  email: response.email, 
                  first: 'green' }
              })*/

            });

                  
           

        }
    },[isFbSDKInitialized]);



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