import React from "react";

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
  const [isInitialized, setIsInitialized] = React.useState(false);
  const facebookAppId = "281271229627551";
  console.log("appid",process.env.FACEBOOK_ID);
  // Initializes the SDK once the script has been loaded
  // https://developers.facebook.com/docs/javascript/quickstart/#loading
  window.fbAsyncInit = function () {
    window.FB.init({
      // Find your App ID on https://developers.facebook.com/apps/
      appId: facebookAppId,
      cookie: true,
      xfbml: true,
      status:true,
      logging:true,
      version: "v10.0",
    });

    window.FB.AppEvents.logPageView();
    setIsInitialized(true);
  };

  console.log("Initialization....");
  injectFbSDKScript();

  return isInitialized;
};


export default useInitFacebookSDK;