import React , { useCallback, useContext,  useEffect,  useState } from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';

 

const FacebookAccess = ( ) => {

    const isFbSDKInitialized = useInitFacebookSDK();
    const[fbLoginStatus,setFbLoginStatus]=useState();
    //const[fbLoginState,setFbLoginState]=useState();


    useEffect(()=>{
        if(isFbSDKInitialized){
            window.FB.getLoginStatus((response)=>{
                setFbLoginStatus(response)
            });
        }
    },[isFbSDKInitialized]);
   

console.log('fbLogin', fbLoginStatus,'isfbinitialized',isFbSDKInitialized)

return (
<div>
    FacebookAccess
</div>
);

}

export default FacebookAccess;