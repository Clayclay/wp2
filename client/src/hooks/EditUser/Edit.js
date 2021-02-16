import React , {useContext, useState} from "react";
import { authContext } from "../../App";
//import {  useParams } from 'react-router-dom';
//import * as ACTION_TYPES from '../../store/actions/action_types';
import * as ACTION_TYPES from '../../store/actions/action_types';


import Albums from './Albums/Albums';
import AddAvatar from "./AddAvatar";
import { initialState } from "../../store/reducers/auth_reducer";
import LangsUser from "./Langs/LangsUser";

import './Edit.css';
import { createStyles,  makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import SelectLangs from "../../function/SelectLangs";
import FormControl from '@material-ui/core/FormControl';

import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete , { createFilterOptions } from '@material-ui/lab/Autocomplete';
import cities from  '../../function/City/cities.json';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';


import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles((theme) =>({

    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },  
    paper: {
        maxWidth: "-webkit-fill-available",
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },
    option: {
        fontSize: 15,
        '& > span': {
          marginRight: 10,
          fontSize: 18,
        },
      }, 
      card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '288px',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  }));
/* CITY LIMIT*/
const filterOptions = createFilterOptions({
  limit: 20,
});

/*Tabs Component */ 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export const Edit = () => {    

  const classes = useStyles();

  const { state: authState, dispatch } = useContext(authContext);
 
  const [user, setUser] = useState(initialState); 
  const id = authState.user._id;
  const [city, setCity] = useState("");
  const [avatarData, setAvatarData]= useState(initialState);

  const [value, setValue] = React.useState(0);

  const handleAppBarChange = (event, newValue) => {
    setValue(newValue);
  };


  const [open, setOpen] = useState(false);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleInputChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = (e, selectlang) => {
      e.preventDefault();
      setUser({
        ...user,
        isSubmitting: true,
        errorMessage: null
      });
      fetch (`/api/user/${id}` ,{ 
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({         
        age: user.age,   
        city: city,
        selectlang: selectlang
      }),  
     
    })
    .then(res => {
      if (res.ok) {
        return res.json();
        }
        throw res;   
    })
    .then(resJson => {
      dispatch({ 
          type: ACTION_TYPES.USER_INPUT_CHANGE,
          payload: resJson
        })
    })
      .catch(error => {
      console.error(error);
        setUser({
          ...user,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
    });  
  };

  const HandleAvatarSubmit = (e) =>{
    e.preventDefault();

    const MyformData = new FormData();
    MyformData.append('avatar', avatarData);

    fetch(`/api/avatar/user/${id}`, {
     method: 'PUT',
     body: MyformData
   })
   .then(res => {
     if (res.ok) {
       return res.json();
      }
       throw res;   
   })
   .then(resJson => {
     dispatch({ 
      type: ACTION_TYPES.USER_INPUT_CHANGE,
      payload: resJson
    })
    setOpen(true);
   })
    .catch(error => {
     console.error(error);
     setUser({
      ...user,
      isSubmitting: false,
      errorMessage: error.message || error.statusText
    });
   });
      
}

  const handleDeleteLang = (languageId, e) => {
    e.preventDefault();
      setUser({
        ...user,
        isSubmitting: true,
        errorMessage: null
    });
    fetch (`/api/user/${id}/langs/${languageId}/del` ,{ 
      method: "GET",
      headers: {          
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`          },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
        }
        throw res;   
    })
    .then(resJson => {
      dispatch({ 
        type: ACTION_TYPES.USER_INPUT_CHANGE,
        payload: resJson
      })
      setOpen(true);
    })
    .catch(error => {
      console.error(error);
        setUser({
          ...user,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
    });
  };

return (
  <Container component="main" maxWidth="xs">
    <Grid container >
      <Container component="main" maxWidth="xs">
        <Card className={classes.card}>

      <Grid container spacing={3}>
      <Grid item xs={12}>
      <Typography gutterBottom variant="h5" component="h2">
  {authState.user.nickname}
  </Typography>
  </Grid> </Grid>

<CardMedia
className={classes.cardMedia}
image= {"/uploads/"+authState.user._id+"/"+ authState.user.avatar}
title="Image title"
>
  <AddAvatar  setAvatarData={setAvatarData}  HandleAvatarSubmit={HandleAvatarSubmit}   user={user} /> 
  </CardMedia>

{/*<CardContent> </CardContent> */}




      {/************************ APPBAR *******************/ }

      <AppBar position="static">
        <Tabs value={value} onChange={handleAppBarChange} aria-label="simple tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Albums" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
       
      <Grid container spacing={3}>
 
        {/**********    LANGUAGE      ***********/}
        <Grid item xs={12}>
            <label htmlFor="languages">
            <LangsUser handleDelete={handleDeleteLang}  languages={authState.user.languages} />
            <SelectLangs handleSelectLang={handleFormSubmit} />     
            </label>
        </Grid>
        

<FormControl fullWidth={true} onSubmit={handleFormSubmit} className={classes.root} noValidate autoComplete="off">

      <TextField 
       id="outlined-basic" 
       variant="outlined" 
       type="text"
       value={user.age}
       onChange={handleInputChange}
       label="Age"
       defaultValue={authState.user.age}
       name="age"
        />


      <TextField
        id="description"
        name="description"
        label="Description"
        multiline
        rowsMax={4}
        value={user.description}
        onChange={handleInputChange}
        variant="outlined"
      />
{user.errorMessage && (
<span className="form-error">{user.errorMessage}</span>
)}

{/**********    CITY DISPLAY       ***********/}

<Autocomplete
id="country-select"
options={cities}
classes={{
option: classes.option,
}}
autoHighlight
value={authState.user.city}
onChange={(event, newValue) => {
setCity(newValue);
}}
getOptionSelected={(option, value) => option.name === value.name}
filterOptions={filterOptions}
getOptionLabel={(option) => option.name}
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

<Button 
  variant="contained" 
  onClick={handleFormSubmit}
  color="primary"
  >   Update  </Button>        
</FormControl>


</Grid>


<Button
        variant="contained"
        color="primary"
        onClick={() => {
          fetch (`/api/user/${id}` ,{ 
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authState.token}`
            },
          })//is incorrect, you should dispatch from the click, or manage it in state
          .then( resJson => {
            dispatch({ type: ACTION_TYPES.LOGOUT })
          })}  
        }>Delete Profile</Button>



{/***************** ALBUMS *************************/}
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Albums   albums={authState.user.albums}   />
      </TabPanel>
      <TabPanel value={value} index={2}>
        TODO
      </TabPanel>

      {/*************************************  ***************************/}

    
      

    
      </Card>
</Container>




        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
        User is successfully Updated
        </Alert>
      </Snackbar>


      </Grid> 
</Container>
);


};

export default Edit ;