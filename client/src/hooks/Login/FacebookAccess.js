import React , { useCallback, useContext,  useEffect,  useState } from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';

 

const FacebookAccess = ( ) => {

    const isFbSDKInitialized = useInitFacebookSDK();
    const[loginState,setLoginState]=useState();
    //const[fbLoginState,setFbLoginState]=useState();
    const [fbUserAccessToken, setFbUserAccessToken] = useState();
   /* FB.getLoginStatus(function(response) {
        statusChangeCallback(response) */
        
    useEffect(()=>{
        if(isFbSDKInitialized){
            window.FB.getLoginStatus((response)=>{
                setLoginState(response)
            });
        }

        window.FB.login(function(response) {
            if (response.status === 'connected') {
             console.log('Welcome!  Fetching your information.... ');
             window.FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
        
    },[isFbSDKInitialized]);

console.log(
'fbLogin', loginState,
'isfbinitialized',isFbSDKInitialized,
'accesstoken',fbUserAccessToken
)



   
//callback change only if one input change
    const logInToFB = useCallback(() => {
        window.FB.login((response) => {
          setFbUserAccessToken(response.authResponse.accessToken);
        });
      }, []);



return (

<div class="fb-login-button" 
data-width="" 
data-size="large" 
data-button-type="login_with" 
data-layout="default" 
data-auto-logout-link="true" 
data-use-continue-as="false"></div>

);

}

export default FacebookAccess;