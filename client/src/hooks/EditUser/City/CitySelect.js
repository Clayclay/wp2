/* eslint-disable no-use-before-define */
import React, {useState} from 'react';
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

/*const cities = [
  {"country": "France", "geonameid": 2967318, "name": "Wittenheim", "subcountry": "Alsace-Champagne-Ardenne-Lorraine"}
  ,{"country": "France", "geonameid": 2970761, "name": "Vanves", "subcountry": "\u00cele-de-France"}
  ]*/

  const filterOptions = createFilterOptions({
    limit: 20,
  });

export const CitySelect = ({defaultValue, setCity}) => {
  const classes = useStyles();
  
  return (
    <Autocomplete
      id="country-select"
      style={{ width: 300 }}
      options={cities}
      classes={{
        option: classes.option,
      }}
      autoHighlight

      onChange={(event, newValue) => {
        setCity(newValue);
      }}

      defaultValue={defaultValue}
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
          label="Choose a city"
          name="field1" 
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
            // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default CitySelect ;