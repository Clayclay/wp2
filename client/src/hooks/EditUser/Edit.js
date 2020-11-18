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
import SelectCity from '../../function/City/SelectCity';
import PlaceIcon from '@material-ui/icons/Place';
import Typography from '@material-ui/core/Typography';

import SelectLangs from "../../function/SelectLangs";
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export const Edit = () => {    

  const classes = useStyles();

  const { state: authState, dispatch } = useContext(authContext);
  const id = authState.user._id;
  const [user, setUser] = useState(initialState);

  const [city, setCity] = useState("");
  const [lang, setLang] = useState("");
 

  const handleInputChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };
  const handleFormSubmit = (event) => {
      event.preventDefault();
      setUser({
        ...user,
        isSubmitting: true,
        errorMessage: null
      });
      fetch (`http://localhost:5000/api/user/${id}` ,{ 
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({         
        city: city.name,
        age: user.age,   
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
        }
        throw res;   
    })
    .then(resJson => {
      alert("User is successfully Updated");
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

  const handleDeleteAlbum = (album, e) => {
      e.preventDefault();
      /*On doit set user pour re afficher le user meme quand on suprime car 
      meme si on delete on effectuer une mise a jours une update
      */
      setUser({
        ...user,
        isSubmitting: true,
        errorMessage: null
      });
      fetch (`http://localhost:5000/api/user/${id}/albums/${album._id}/del` ,{ 
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

  const handleSelectLang = (selectlang, e) => {
    e.preventDefault(); 
    //setLvl({...lvl});
    setLang(
      {
        ...selectlang,
        isSubmitting: true,
        errorMessage: null
      });

    fetch (`http://localhost:5000/api/user/${id}/langs` ,
      { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({      

        langue: selectlang.langue,
        iso: selectlang.iso,
        nativName:  selectlang.nativName,
        langid: selectlang._id,
        //lvl: lvl
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        throw res;   
    })
    .then(resJson => {
      alert("Lang is successfully added");
      dispatch({ 
        type: ACTION_TYPES.USER_INPUT_CHANGE,
        payload: resJson
      })
    })
    .catch(error => {
      console.error(error);
        setLang({
          ...lang,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
    });
  };   

  const handleDeleteLang = (languageId, e) => {
    e.preventDefault();
      setUser({
        ...user,
        isSubmitting: true,
        errorMessage: null
    });
    fetch (`http://localhost:5000/api/user/${id}/langs/${languageId}/del` ,{ 
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
      alert("Language is delete");
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

return (
  <Container component="main" maxWidth="xs">
     
      <div className="card">
        <div className="edit"> 
        <Typography variant="h5" gutterBottom>
          {authState.user.nickname} 
        </Typography>

        {id}   
        <FormControl onSubmit={handleFormSubmit} className={classes.root} noValidate autoComplete="off">

              <TextField 
               id="outlined-basic" variant="outlined" 
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


        <PlaceIcon/>{authState.user.city}   
        <SelectCity defaultValue={authState.user.city} setCity={setCity}/>

      {user.errorMessage && (
        <span className="form-error">{user.errorMessage}</span>
      )}
    
        <Button 
          variant="contained" 
          onClick={handleFormSubmit}
          color="primary"
          >   Update  </Button>        
        </FormControl>

      <label htmlFor="languages">
        <SelectLangs handleSelectLang={handleSelectLang} />
        <LangsUser handleDelete={handleDeleteLang}  languages={authState.user.languages} />
      </label>

      <label>
        <AddAvatar  user={user} /> 
      </label>

<Albums  albums={authState.user.albums} onDelete={handleDeleteAlbum}    />

      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          fetch (`http://localhost:5000/api/user/${id}` ,{ 
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authState.token}`
            },
          })//is incorrect, you should dispatch from the click, or manage it in state
          .then( resJson => {
            dispatch({ type: ACTION_TYPES.LOGOUT })
          })}  
        }>Delete Profile</Button>

      </div>
  </div>
</Container>
);


};

export default Edit ;