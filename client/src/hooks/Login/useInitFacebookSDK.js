import React from 'react';


// Injects the Facebook SDK into the page
const injectFbSDKScript = () => {
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};

export const useInitFacebookSDK = () => {

    const fcbAppId = '281271229627551' // process.env.FACEBOOK_APP_ID
    const [isInitialized,setIsInitialized]=React.useState(false)

    window.fbAsyncInit = () => {
        window.FB.init({
          appId      : fcbAppId,
          cookie     : true,
          xfbml      : true,
          version    : 'v10.0'
        });
        window.FB.AppEvents.logPageView();
        setIsInitialized(true);
    };

    injectFbSDKScript();
    
    return isInitialized;

}
export default useInitFacebookSDK;