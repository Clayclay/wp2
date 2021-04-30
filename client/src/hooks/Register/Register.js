import React, {useState, useContext}  from "react";
import { authContext } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action_types';

import Copyright from "../../function/Copyright";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { makeStyles } from '@material-ui/core/styles';
 
import RegisterLang from './RegisterLang';
import RegisterCity from './RegisterCity';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },


}));


const initialState = {
  email: "",
  password: "",
  description: "",
  city: "",
  age: "", 
  nickname:"",
  isSubmitting: false,
  errorMessage: null     
  
};

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 
      ;
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

export const Register = () => {

  const classes = useStyles();
 // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO
  const { dispatch }  = useContext(authContext);
  const [data, setData] = useState(initialState);

  const [/*activeStep*/, setActiveStep] = useState(0);
  const steps = getSteps();

  const [userLang,setUserLang] = useState([]);
  const [usercity, setUserCity] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };
   
// a function that handles the form submission to the backend API
  const handleSubmit = (event) => {
    // the functional update 
    event.preventDefault();
    //useState ne fusionne pas automatiquement les objets de mise à jour. avec prevState
    setData(prevState => ({
      ...prevState,
      isSubmitting: true,
      errorMessage: null       
    }));

     //use the fetch API to send payload to serveur
     //that handles the form submission to the backend
    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({         
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        age: data.age,
        city: usercity,
        description: data.description,
        gender: data.gender,
        languages: userLang, 
      })
    })
        .then(res => res.json())
       
       //is successful, we will dispatch a LOGIN action
      
        .then(resJson => {
          if (resJson.error) {
            throw new Error(resJson.error);
          }
        dispatch({ 
             type: ACTION_TYPES.ADD_USER,
             payload: resJson
          })
       })
       .catch(error => {
        console.error(error);
         setData({
           ...data,
           isSubmitting: false,
           errorMessage: error.message || error.statusText
         });
       });
   };

  console.log(userLang,usercity)

 return (
    <Container component="main" maxWidth="xs">
     
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit} encType="multipart/form-data">
{/* */ }
        <FormControl onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">

          <Grid container spacing={2}>
          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="nickname"
                name="nickname"
                variant="outlined"
                required
                fullWidth
                id="nickname"
                label="Nickname"
                autoFocus
                value={data.nickname}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1"  onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="age"
                name="age"
                variant="outlined"
                required
                fullWidth
                id="age"
                label="Age"
                autoFocus
                value={data.age}
                onChange={handleChange}
                type="number"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
            {/**********    CITY DISPLAY       ***********/}
<RegisterCity usercity={usercity} setUserCity={setUserCity} />
</Grid>
            <Grid item xs={12} sm={12}>
            {/**********    LANG DISPLAY       ***********/}
<RegisterLang userLang={userLang} setUserLang={setUserLang} />
            {/***********                       **********/}
            </Grid>

             </Grid>
     {data.errorMessage && (
               <span className="form-error">{data.errorMessage}</span>
             )}

             <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={data.isSubmitting}
          >
             {data.isSubmitting ? (
                 "Loading..."
               ) : (
                 "Sign Up"
               )}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
{/* */ }
</FormControl>
        </form>
       
        </div>

{/**********    STEPPER       **********
        <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>*/}

       <Box mt={5}>
        <Copyright />
      </Box>
      </Container>
   )
 }

 export default Register;
