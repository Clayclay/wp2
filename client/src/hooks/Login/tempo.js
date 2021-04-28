<html>
    <body>
<script>
 { /*
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '281271229627551',
      cookie     : true,
      xfbml      : true,
      version    : 'v10.0'
    });
    FB.AppEvents.logPageView();
  };*/}
  
{/*
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response)
});*/
}
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  })
}

{/*loadsdkasync
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));*/}

</script>


<div
class="fb-like"
data-share="true"
data-width="450"
data-show-faces="true">
</div>


<fb:login-button 
  scope="public_profile,email"
  onlogin="checkLoginState();">
</fb:login-button>

<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>

</body>
</html>