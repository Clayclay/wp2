import React , { useContext, useState , useReducer } from 'react';
import CodeForm from './CodeForm';
import EmailForm from './EmailForm';
import NewPasswordForm from './NewPasswordForm';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import useStyles from '../../function/UseStyles';
import Copyright from "../../function/Copyright";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useHistory } from "react-router-dom";

/*
 3 stage process
// 1 mail
// 2 code receive by mail
// 3 reset pswd

    COMPONENT :

    -reset pswd MAIN
    -ResetForm  stage=1
    -CodeForm  stage=2
    -NewPasswordForm stage=3

    SWITCH: 

    STEPPER: 
    https://codesandbox.io/s/cvdid?file=/demo.tsx

*/

function getSteps() {
  return ['Enter your email', 'Enter Code', 'Reset Password'];
}

 const ResetPassword = () => {
    const classes = useStyles();

    const [user,setUser] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [ confirmPassword, setConfirmPassword]= useState("");

    let history = useHistory();

    function getStepContent(step) {
  switch (step) {
    case 0 :
      return  <EmailForm  handleEmailSubmit={handleEmailSubmit} /> ;
    case 1:
        return <CodeForm  handleCodeSubmit={handleCodeSubmit}  />;
    case 2:
        return <NewPasswordForm handlePswdSubmit={handlePswdSubmit}  />;
    default:
        return 'Unknown step';
  }
}

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
  

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
      history.push("/login");
      
    };
  
    const handleEmailSubmit = (userEmail, e) => { //want this method to make a request to authenticate with our backend and save the resulting token to a browser cookie.
      setEmail({
        userEmail
      });
      e.preventDefault();
      fetch(`http://localhost:5000/api/emailcheck/${userEmail}`, {
        method: 'GET',
          headers: {
          'Content-Type': 'application/json'
        }
      }) 
     
    .then(res => {  if (res.ok) { handleNext(); return res.json();  }   throw res;  })
    .then(resJson => {
      if (resJson.error) {
        throw new Error(resJson.error);
      }
      console.log(resJson)  
      setUser(resJson);     
      })
      .catch(error => {
      console.error(error); })
  };

 

  const handleCodeSubmit = (code, e) => { //want this method to make a request to authenticate with our backend and save the resulting token to a browser cookie.
    e.preventDefault();
    setCode({code});
    fetch(`http://localhost:5000/api/resetpassword/${user._id}/${code}`, {
      method: 'GET',
        headers: {
        'Content-Type': 'application/json'
      },
    }) 
    .then(res => {  if (res.ok) {handleNext(); return res.json();  }   throw res;  })
    .then(resJson => {
      if (resJson.error) {
        throw new Error(resJson.error);
      }
      })
      .catch(error => {
      console.error(error); }) 
  }

  const handlePswdSubmit = (pswd, e) => { //want this method to make a request to authenticate with our backend and save the resulting token to a browser cookie.
    e.preventDefault();

    fetch(`http://localhost:5000/api/resetpassword/${user._id}/${code.code}`, {
      method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        password: pswd
      })   
    }) 
    .then(res => {  if (res.ok) { handleNext(); return res.json(); }  throw res;  })
  }


    return(

<Container component="main" maxWidth="xs">
<div className={classes.paper}>
  <Avatar className={classes.avatar}>
    <LockOutlinedIcon />
  </Avatar>
  <Typography   component="h1" variant="h5">
  Reset Password
  </Typography>


<div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  
</div>
<Box mt={8}>
    <Copyright />
</Box>
</Container>

    )
}
    
export default ResetPassword;
    