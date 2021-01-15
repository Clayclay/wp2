import React , { useState, useEffect } from 'react';
import UsersCard from './UsersCard';
import './Users.css';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormLabel from "@material-ui/core/FormLabel";
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';

import TextField from "@material-ui/core/TextField";

import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import cities from '../../function/City/cities.json'

const useStyles = makeStyles((theme) => ({
  root: {


    
  },
  gridList: {
    width: "-webkit-fill-available",
    //height: 450,
  },
  
}));

const UsersList = ({users  }) => {
  const classes = useStyles();

  const [usersList, setUsersList] = useState(users);

  const [genderFilter, setGenderFilter] = useState(null);
  const [langFilter, setLangFilter] = useState(null);
  const [cityFilter, setCity] = useState(null);
  const [sort, setSort] = useState(null);

  const filterOptions = createFilterOptions({
    limit: 20 //City
  }); 

  const handleClear = () => {
    setCity(null)
    setGenderFilter(null)
    setLangFilter(null)
  }

  const filterArray = (array, filters) => {
    return array.filter((item) => {
      return Object.keys(filters).every((key) => {
        if (typeof filters[key] !== "function") {
          return true;
        }
        return filters[key](item[key]);
      });
    });
  };

  useEffect(( ) => {

    const filteredUsers = users;
    const Filters = {};

    if (cityFilter !== "" && cityFilter !== null) {
      Filters["city"] = (city) => city === cityFilter.name;
    } else {}

    if (genderFilter !== null) {
      Filters["gender"] = (gender) => gender === genderFilter;
    } else {}

    if (langF !== null) {
      Filters["languages"] = (languages) =>
        languages.some(({ langue }) => langue === langF.langue);
    } else {}


     
    const newList = filterArray(filteredUsers, Filters);


    setUsersList(newList);

  },[genderFilter,cityFilter,langFilter,sort])


       return (
  
        <Container maxWidth="sm">

<Grid container spacing={3}>

  
<FormControl component="fieldset" variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={genderFilter}
          onChange={(event) => setGender(event.target.value)}
          label="Gender"
        >
          <MenuItem value={null}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"male"}>Male</MenuItem>
        </Select>
</FormControl>
   

<FormControl component="fieldset" variant="outlined">
  <Autocomplete
        id="country-select"
        options={cities}
        classes={{
          option: classes.option
        }}
        autoHighlight
        filterOptions={filterOptions}
        getOptionLabel={(option) => option.name}
        value={cityFilter}
        onChange={(event, newValue) => {
          setCity(newValue);
        }}
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
              autoComplete: "off"
            }}
          />
        )}
      />
</FormControl>
<FormControl component="fieldset" >
        <Autocomplete
          id="tags-standard"
          options={langs}
          getOptionLabel={(option) => option && option.langue} //if (option !== undefined) { return option.language }
          value={langFilter}
          onChange={(event, newValue) => {
            setLang(newValue);
          }}
          getOptionSelected={(option) => option.langue === langF.langue}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Language"
              placeholder="Languages"
            />
          )}
        />
</FormControl>
<Grid item>
      <Button onClick={() => handleClear() }
        variant="contained" 
        color="secondary"
      >
          Clear
      </Button>
      </Grid>
<hr />

    {
      
        <GridList cellHeight={220} className={classes.gridList} cols={1}  >
            {  usersList.map(user => 
                <GridListTile  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                  <UsersCard key={user._id.toString()} user={user}  />
                </GridListTile>
              )
            }
        </GridList>        

    }
</Grid>
      </Container>  
       )
  
  }

  export default UsersList;

