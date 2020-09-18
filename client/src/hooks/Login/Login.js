import React , { useContext, useState } from 'react';
import { authContext } from "../../App";

import * as ACTION_TYPES from '../../store/actions/action_types';

  
import Copyright from "../../function/Copyright";


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

import useStyles from './useStyles';


const Login = () => {

 // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO 
 const {   dispatch  }  = useContext(authContext);
 const classes = useStyles();

 //INIT
 const initialState = {
  email: "",
  password: "",
  isSubmitting: false,
  errorMessage: null
};
   
   const [data, setData] = useState(initialState);
   //initialState object into the useStatehook.
   //handle the pseudo state (name), the password state
   const handleInputChange = event => {
       setData({
         ...data,
         [event.target.name]: event.target.value
       });
     };

     const handleFormSubmit = (event) => { //want this method to make a request to authenticate with our backend and save the resulting token to a browser cookie.
      event.preventDefault();
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null
      });
         fetch('/api/authenticate', {// use fetch to authenticate against our backend and retrieve a JSON Web Token
          method: 'POST',
            headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            email: data.email,
            password: data.password
          })   
        }) 
      .then(res => {  if (res.ok) { return res.json(); }  throw res;  })
      .then(resJson => {
        if (resJson.error) {
          throw new Error(resJson.error);
        }
          // In order to call dispatch, we need to import the AuthContext from the App component into our Login component and then use the dispatch function
         dispatch({ 
              type: ACTION_TYPES.LOGIN_SUCCESS,
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
           
        })  
    };

    return ( 
      <Container component="main" maxWidth="xs">
    
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
       <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      <form onSubmit={handleFormSubmit}>
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={handleInputChange}
          /> 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            value={data.password}
            onChange={handleInputChange}
          />
       {/*message.content*/}
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
                "Sign In"
              )}
          </Button>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me TODO"
          />

       </form>
       
       <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password? ( TODO )
              </Link>
            </Grid>
            <Grid item>
              <Link href="register" variant="body2"   >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          </div>
          <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    )
  }
  export default Login;
