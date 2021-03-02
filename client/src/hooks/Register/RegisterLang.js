import React, { useState , useEffect, useContext} from 'react';
import { authContext } from "../../App";
import {getLangs} from '../../function/GetLangs';


import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
  root: {
    //width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function RegisterLang({userLang, setUserLang}) {
  const classes = useStyles();
  const { state: authState } =useContext(authContext);
  const [langs, setLangs]=useState([])

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [value, setValue] = useState([]);

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

     <div className={classes.root}>

    {loading ? (
      <span className="loader">LOADING...</span>
    ) : error ? (
      <span className="error">AN ERROR HAS OCCURED</span>
    ) : (
      <>
   
      <Autocomplete
        multiple
        id="tags-outlined"
        options={langs}
        getOptionLabel={(option) => option && option.langue} 

//defaultValue={[top100Films[13]]}
onChange={(event, newValue) => {
  setValue(newValue);
  setUserLang(newValue);
}}
value={userLang}
getOptionSelected={(option, value) =>  option.langue === value.langue   }

        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Language"
            variant="outlined"
            placeholder="Languages"
          />
        )}
      />
                  
</>

)}
</div>
  );
}