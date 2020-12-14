/* eslint-disable no-use-before-define */
import React, { useState , useEffect, useContext} from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {getLangs} from './GetLangs';
import { authContext } from "../App";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3)
    }
  }
}));

export default function SelectLangs({handleSelectLang}) {

   //FOR ALL LANG
  const { state: authState } =useContext(authContext);

  const [langs, setLangs]=useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  ///SELECT
  const [selectlang, setSelectLang] = useState([]);
  const classes = useStyles();

  const [inputValue, setInputValue] = useState('');


  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    setSelectLang(selectlang);
  };

  useEffect( () => {
    let isSubscribed = true
    getLangs()
      .then( langs => { 
        if (isSubscribed) {}
      setLangs(langs);
    });
    setLoading(false);
    return () => isSubscribed = false
    }, [authState.token]);

  return (
    
    <Container component="main" maxWidth="xs">  

    {loading ? (
          <span className="loader">LOADING...</span>
        ) : error ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>

<Grid container spacing={1} >
<Grid item xs={8} >
        <Autocomplete
          multiple
          id="tags-standard"
          options={langs}

          //style={{ width: 300 }}
          //getOptionLabel={  {(option) => option.langue } car ASYNC
          getOptionLabel={(option) => option && option.langue} //if (option !== undefined) { return option.language } 
          //defaultValue={}  //defaultValue={[langs[1]].langue}

          value={selectlang}
          onChange={(event, newValue) => {
            setSelectLang(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}


          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Language"
              placeholder="Languages"
            />
          )}
        />
        </Grid>
    <Grid item    >
      <Button 
      color="primary"
      variant="contained"
      onClick={(e) => handleSelectLang(selectlang, e)}>Add</Button>
   </Grid>
   </Grid>

          
</>
        )}
 
    </Container>
    
  );
};









/*import React , { useEffect, useContext, useState } from 'react';

import { authContext } from "../App";
import { createStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import {getLangs} from './GetLangs';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) =>
createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
   
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}),
);


export default function  SelectLangs({handleSelectLang}) {

  const { state: authState } =useContext(authContext);
  const classes = useStyles();
  const theme = useTheme();
  
  const [selectlang, setSelectLang]=useState('');


  //FOR ALL LANG
  const [langs, setLangs]=useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect( () => {

    let isSubscribed = true
   
    getLangs()
      .then( langs => { 
        if (isSubscribed) {}
      setLangs(langs);
    });
  
    setLoading(false);
    return () => isSubscribed = false
    
    }, [authState.token]);
   
 
  const handleChange = event /*({target})*/ 
  /*=> {
    //const value = JSON.parse(target.value); => car OBJET
    setSelectLang(  event.target.value );
    
      /*{
        ...userlang,
        [event.target.name]: event.target.value,   
      }*/
 /* } 



  return(
  
    <div className="">  

    {loading ? (
          <span className="loader">LOADING...</span>
        ) : error ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>

          <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="select-lang">Language</InputLabel>
          <Select 
            labelId="select-lang"
            id="mutiple-lang"
            onChange={handleChange} 
            value={selectlang}
            label="lang"
            >
          {langs.length > 0 && 

              langs.map(language => (
                <MenuItem  key={language._id}  value={language} >
                {language.nativName}
              </MenuItem>

              /*<option key={language._id} 
              value={[JSON.stringify(language) ]}>
                {language.nativName}</option>*/
    /*      ))}
          </Select>
          </FormControl>

          <Button onClick={(e) => handleSelectLang(selectlang, e) }
          
          >Add languages</Button>
          
</>
        )}
 
    </div>
    
  );
};


*/