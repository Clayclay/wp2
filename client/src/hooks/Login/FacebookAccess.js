import React , { useCallback, useEffect,  useState } from 'react';
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

          if (response.status === 'connected') {
            console.log('Welcome!  Fetching your information.... ');
            window.FB.api('/me', function(response) {
              console.log('Good to see you, ' + response.name + '.');
            });
            console.log(response)
           } else {
            console.log('User cancelled login or did not fully authorize.');
           }
        });

      }, []);

      const logOutOfFB = useCallback(() => {
        window.FB.logout(() => {
          setFbUserAccessToken(null);
        });
      }, []);



return (

<div>
{fbUserAccessToken ? (
          <button onClick={logOutOfFB} className="btn confirm-btn">
            Log out
          </button>
        ) : (
          <button onClick={logInToFB} className="btn confirm-btn">
            Login with Facebook
          </button>
        )}
</div>

);

}

export default FacebookAccess;
export default FacebookAccess;