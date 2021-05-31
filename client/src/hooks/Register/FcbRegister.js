import React, {useState, useContext, useEffect}  from "react";
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
import FormControl from '@material-ui/core/FormControl';
import { useLocation } from 'react-router-dom';


import Autocomplete , { createFilterOptions } from '@material-ui/lab/Autocomplete';
import cities from  '../../function/City/cities.json';
import {getLangs} from '../../function/GetLangs';

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


/* CITY LIMIT*/
const filterOptions = createFilterOptions({
  limit: 20,
});

export const FcbRegister = () => {

  const classes = useStyles();
 // OBJET MAGIQUE QUI TRANSMET A TS LES COMPO
  const { dispatch }  = useContext(authContext);
  const [data, setData] = useState(initialState);


  const location = useLocation();
  //const { id, color } = location.state; // Read values passed on state
  console.log("location.state",location.state,
  data,'data'
 )
  
  const [city, setCity] = useState("");
  const [langValue, setlangValue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [langs, setLangs]=useState([])
  const [loading, setLoading] = useState(true);
  const [error, /*setError*/] = useState(null);


  useEffect( () => {
    let isSubscribed = true
    getLangs()
    .then( langs => { 
      if (isSubscribed) {}
      setLangs(langs);
    }); 

    setData({
      ...data,
      email : location.state.email
    })

    setLoading(false);
    return () => isSubscribed = false
    }, []);

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
        city: city,
        description: data.description,
        gender: data.gender,
        languages: langValue, 
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
                defaultValue={data.email}
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

<Autocomplete
id="country-select"
options={cities}
classes={{
option: classes.option,
}}
autoHighlight
value={city}
onChange={(event, newValue) => {
setCity(newValue);
}}
getOptionSelected={(option, value) => option.name === value.name}
filterOptions={filterOptions}
getOptionLabel={(option) => option && option.name} 
renderOption={(option) => (
<React.Fragment>
  {option.name} ({option.country}) 
</React.Fragment>
)}
renderInput={(params) => (
<TextField
  {...params}
  id="field1"
  label="Choose a city"
  name="field1" 
  variant="outlined"
  inputProps={{
    ...params.inputProps,
    autoComplete: 'off',
    // disable autocomplete and autofill
  }}
/>      )}
/>
</Grid>
            <Grid item xs={12} sm={12}>
            {/**********    LANG DISPLAY       ***********/}


            {loading ? (
          <span className="loader">LOADING...</span>
        ) : error ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>

<Autocomplete
          multiple
          id="tags-standard"
          options={langs}

          //style={{ width: 300 }}
          //getOptionLabel={  {(option) => option.langue } car ASYNC
          getOptionLabel={(option) => option && option.langue} //if (option !== undefined) { return option.language } 
          //defaultValue={}  //defaultValue={[langs[1]].langue}

          value={langValue}
          onChange={(event, newValue) => {
            setlangValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
         
          getOptionSelected={(option, value) =>  option.langue === value.langue   }

          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Language"
              placeholder="Languages"
              variant="outlined"
            />
          )}
        />
        </>
        )}


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



       <Box mt={5}>
        <Copyright />
      </Box>
      </Container>
   )
 }

 export default FcbRegister;
