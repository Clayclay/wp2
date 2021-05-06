import React, { useState , useEffect, useContext} from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
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

export default function SelectLangs({handleSelectLang }) {

   //FOR ALL LANG
  const { state: authState } =useContext(authContext);

  const [langs, setLangs]=useState([])
  const [loading, setLoading] = useState(true);
  const [error, /*setError*/] = useState(null);

  ///SELECT
  const [value, setValue] = useState([]);
  
  const [inputValue, setInputValue] = useState('');


  /*const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    //setSelectLang(selectlang);
  };*/

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

          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
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
        </Grid>

    <Grid item    >
      <Button 
      color="primary"
      variant="contained"
      onClick={(e) => handleSelectLang(e, value)}>Add</Button>
   </Grid>


   </Grid>

          
</>
        )}
 
    </Container>
    
  );
};

