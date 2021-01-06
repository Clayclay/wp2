import React , { useState, useEffect } from 'react';
import UsersCard from './UsersCard';
import './Users.css';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';

import SelectCity  from '../../function/City/SelectCity';
import SelectLangs from '../../function/SelectLangs';

import Button from '@material-ui/core/Button';

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormLabel from "@material-ui/core/FormLabel";
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    
  },
  gridList: {
    width: "-webkit-fill-available",
    //height: 450,

  },
  
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const UsersList = ({users  }) => {
  const classes = useStyles();

  const [usersList, setUsersList] = useState(users);

  const [cityFilter, setCity] = useState('');// deja mit
  const [genderFilter, setGenderFilter] = useState('');
  const [langFilter, setLangFilter] = useState(''); 

  
  

  const handleSelectLang = (selectlang, e) => {
    e.preventDefault(); 
    setLangFilter(selectlang)
  };   
  const handleGenderChange = (event) => {
    event.preventDefault();
    setGenderFilter(event.target.value);
  };

  const clearFilter = () => {
    setCity('')
    setGenderFilter('')
    setLangFilter({})
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

  console.log("filter",cityFilter.name,langFilter)
  console.log("userslist",usersList)

  useEffect(( ) => {

    const filteredUsers = users;
    const filters = {
      gender: (gender) => gender === genderFilter || !genderFilter,
      city: (city) => city === cityFilter.name || !cityFilter,
      languages: (languages) =>
            languages.some(({ langue }) => langue === langFilter) || !langFilter,
    }
   
    setUsersList(filterArray(filteredUsers, filters));

  },[genderFilter,cityFilter,langFilter])


  // Function controll all filter

   /**
   * The method `filterArray()` has the following signature:
   *
   * `function filterArray<TInput = any>(array: TInput[], filters: IFilters) => TInput[]`
   *
   * Where the function receives an array as the first argument, and a plain object
   * describing the fields to filter as the last argument.
   * The function returns an array of the same type as the input array.
   *
   * The signature of the filters arguments is the following:
   *
   * `interface IFilters {
   *   [key: string]: (value: any) => boolean;
   * }`
   *
   * Where the `filters` argument is an object that contains a `key: string`
   * and its value is a function with the value of the property to evaluate.
   * As the function predicate is evaluated using the `Array.prototype.every()` method,
   * then it must return a boolean value, which will determine if the item
   * must be included or not in the filtered array.
   */

       return (
  
        <Container maxWidth="sm">

<Grid container spacing={3}>
        <FormControl >
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={genderFilter}
          onChange={handleGenderChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
        </FormControl>
        
          <SelectLangs handleSelectLang={handleSelectLang} />

          <SelectCity   setCity={setCity} />

        <Button onClick={() => clearFilter() }
        variant="contained" 
        color="secondary"
        >
          Clear Filter
        </Button>
  </Grid>


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

      </Container>  
       )
  
  }

  export default UsersList;

