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

    const navigate = useNavigate();
    let [error, setError] = React.useState(null);


console.log(
'fbLogin', loginState,
'isfbinitialized',isFbSDKInitialized,
'accesstoken',fbUserAccessToken
);
   
//callback change only if one input change
    const logInToFB = React.useCallback(() => {
      window.FB.login((response) => {
        setFbUserAccessToken(response.authResponse.accessToken);

        console.log("response :: pour login",response)

        if (response.status === 'connected') {
          navigate('/fcbRegister', 
            { state: { id: 7, color: 'green' } 
        });
        } else if(response.status === 'not_authorized'){
           setError(response.status);
        } else  { 
    // The user isn't logged in to Facebook. You can launch a
    // login dialog with a user gesture, but the user may have
    // to log in to Facebook before authorizing your application.
        }

/*Then, you can access the state data in '/other-page' via the useLocation hook:

const {state} = useLocation();
const { id, color } = state; // Read values passed on state */

      }, {scope: 'email'})

      window.FB.api('/me', function(response) {
        console.log("api Me",JSON.stringify(response));
    });
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