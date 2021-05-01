import React , { useState } from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';
import Button from '@material-ui/core/Button';

function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const useStyles = makeStyles((theme) => ({
 fcb: {
    margin: theme.spacing(1),

    background: '#4267b2',
    color: white,
    height: '40px',
    width: '250px',


  },
  
}));


const FacebookAccess = ( ) => {

    const isFbSDKInitialized = useInitFacebookSDK();
    
    const [loginState,setLoginState]  = useState();
    const [fbUserAccessToken, setFbUserAccessToken] = useState();
 
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
      })

      windows.FB.api('/me', function(response) {
        console.log(JSON.stringify(response));
    });
    }, []);

    const logOutOfFB = React.useCallback(() => {
      window.FB.logout(() => {
        setFbUserAccessToken(null); 
        deleteCookie("fblo_" + process.env.FACEBOOK_ID); 
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