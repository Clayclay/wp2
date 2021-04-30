import React from 'react';

export const useInitFacebookSDK = () => {
  // Load the SDK asynchronously
  (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
  window.fbAsyncInit = () => 
  {
      window.FB.init({
          appId: 281271229627551,
          cookie: true,
          xfbml: true,
          version: 'v6.0'
      });
  }
}


