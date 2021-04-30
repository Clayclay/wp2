import React , { useState } from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';

 

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
      })
    }, []);

    const logOutOfFB = React.useCallback(() => {
      window.FB.logout(() => {
        setFbUserAccessToken(null);
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