import React , { useContext,  useEffect,  useState } from 'react';
import useInitFacebookSDK from './useInitFacebookSDK';


const FacebookAccess = ( ) => {

    const isFbSDKInitialized = useInitFacebookSDK();

useEffect(()=>{

})
    
console.log('test', isFbSDKInitialized)

return (
<div>
    FacebookAccess
</div>
);

}

export default FacebookAccess;