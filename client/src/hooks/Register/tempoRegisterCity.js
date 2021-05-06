import React, { useState , useEffect, useContext} from 'react';
import { authContext } from "../../App";
import {getLangs} from '../../function/GetLangs';


import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import cities from  '../../function/City/cities.json';

const useStyles = makeStyles((theme) => ({
  root: {
   //width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

/* CITY LIMIT*/
const filterOptions = createFilterOptions({
    limit: 20,
  });
  

export default function RegisterCity({ setUserCity}) {

    const classes = useStyles();
    
    const [value] = useState();
 

        return (
    

<Autocomplete
id="country-select"
options={cities}
classes={{
option: classes.option,
}}
autoHighlight
value={value}
onChange={(event, newValue) => {
setUserCity(newValue);
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


);
}