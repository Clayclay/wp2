import React , { useCallback, useContext,  useEffect,  useState } from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';


const FacebookAccess = ( ) => {

    const isFbSDKInitialized = useInitFacebookSDK();
    const[fbLoginStatus,setFbLoginStatus]=useState();
    //const[fbLoginState,setFbLoginState]=useState();

    const logInToFb = useCallback(()=>{
        window.FB.login((response)={
            setFbLoginStatus(response)
        });
    },[]);

    useEffect(()=>{
        if(isFbSDKInitialized){
        window.FB.getLoginStatus((response)=>{
            setFbLoginStatus(response)
        })
        }
    },[isFbSDKInitialized]);
    
console.log('test', fbLoginStatus)

return (
<div>
    FacebookAccess
</div>
);

}

export default FacebookAccess;