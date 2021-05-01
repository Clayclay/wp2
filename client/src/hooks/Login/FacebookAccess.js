import React , { useState } from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';

function deleteCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

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
    }, []);

    const logOutOfFB = React.useCallback(() => {
      window.FB.logout(() => {
        setFbUserAccessToken(null); 
        deleteCookie("fblo_" + "281271229627551"/*process.env.FACEBOOK_ID*/); 
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