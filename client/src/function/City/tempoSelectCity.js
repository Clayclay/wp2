/* eslint-disable no-use-before-define */
import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete , { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

import cities from  './cities.json';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});


  const filterOptions = createFilterOptions({
    limit: 20,
  });

function SelectCity({ setCity, defaultValue}) {
  const classes = useStyles();  
  const [value] = useState(defaultValue);
 
 

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
        />
      )}
    />
  );
}

export default SelectCity ;