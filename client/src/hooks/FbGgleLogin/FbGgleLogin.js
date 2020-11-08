import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

const FbGgleLogin = () => {



    const responseFacebook = (response) => {
      console.log(response);
    }

    const responseGoogle = (response) => {
      console.log(response);
    }

    return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

      <FacebookLogin
        appId="281271229627551" //APP ID 
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <br />
      <br />


      <GoogleLogin
        clientId="48015150064-j4p5kp5gmbb20vm5eueabpijrk53ev7u.apps.googleusercontent.com" //CLIENTID 
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />

      </div>
    );
  }


export default FbGgleLogin;