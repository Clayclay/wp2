import React , { useState, useEffect,useContext } from 'react';
import UsersCard from './UsersCard';
import './Users.css';
import { authContext } from "../../App";

import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

import {getLangs} from '../../function/GetLangs';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';

import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from '@material-ui/core/Divider';

import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import cities from '../../function/City/cities.json'

const useStyles = makeStyles((theme) => ({
  root: {

    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    
  },
  filter:{
    marginBottom:'5px',
  },
  gridList: {
    width: "-webkit-fill-available",
  
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    maxWidth: 300
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
  
}));

const UsersList = ({users, langs  }) => {
  const classes = useStyles();
  const { state: authState } =useContext(authContext);
  const [usersList, setUsersList] = useState(users);
  //const [loading, setLoading] = useState(true);
  //const [langs, setLangs]=useState()

  /*
  useEffect( () => {
    let isSubscribed = true
    getLangs()
    .then( langs => { 
        if (isSubscribed) {}
      setLangs(langs);
    });
    setLoading(false);
    return () => isSubscribed = false
    }, []);*/
  
  const [genderFilter, setGenderFilter] = useState("");
  const [langFilter, setLangFilter] = useState(null);
  const [cityFilter, setCityFilter] = useState(null);
  const [sort, setSort] = useState("");

  const [ statutFilter, setStatutFilter] = useState("");

  const filterOptions = createFilterOptions({
    limit: 20 //City
  }); 

  const handleClear = () => {
    setCityFilter(null)
    setGenderFilter("")
    setLangFilter(null)
    setStatutFilter("")
  }

  useEffect(( ) => {

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

    const filteredUsers = users;
    const Filters = {};

    console.log(cityFilter)
    if (cityFilter !== "" && cityFilter !== null) {
      Filters["city"] = (city) =>  city.name  === cityFilter.name ;
    } else {}

    if (genderFilter !== "") {
      Filters["gender"] = (gender) => gender === genderFilter;
    } else {}

    if (langFilter !== "" && langFilter !== null) {
      Filters["languages"] = (languages) =>
        languages.some(({ langue }) => langue === langFilter.langue);
    } else {}

    if( statutFilter === true ){
      Filters["online"]= (online) => online === statutFilter;
    }else{}
     
    const newList = filterArray(filteredUsers, Filters);
//console.log(statutFilter)
//console.log(' Filters',Filters)
//setUsersList(newList);

if (sort === "new") {
  const newSortingList = [...newList].reverse(); 
  setUsersList(newSortingList);
} else {
  const newSortingList = [...newList].sort();
  setUsersList(newSortingList);
}  

  },[genderFilter,cityFilter,langFilter,sort, statutFilter])

       return (
  
        <Container maxWidth="md" className={classes.root}>

< Grid container className={classes.filter}  > 
  
<FormControl component="fieldset" variant="outlined"  className={classes.formControl} >
        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={genderFilter}
          onChange={(event) => setGenderFilter(event.target.value)}
          label="Gender"
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
          <MenuItem value={"male"}>Male</MenuItem>
        </Select>
</FormControl>


<FormControl component="fieldset" variant="outlined"  className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Online</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={statutFilter}
          onChange={(event) => setStatutFilter(event.target.value)}
          label="Online"
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>

<FormControl component="fieldset"  className={classes.formControl}>
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
          setCityFilter(newValue);
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
            label="City"
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
<FormControl component="fieldset" className={classes.formControl} >
        <Autocomplete
          id="tags-standard"
          options={langs}
          getOptionLabel={(option) => option !== undefined && option.langue} 
          //if (option !== undefined) { return option.language }
          value={langFilter}
          onChange={(event, newValue) => {
            setLangFilter(newValue);
          }}
          getOptionSelected={(option) => option.langue === langFilter.langue}
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


<FormControl component="fieldset" className={classes.formControl} >
        <InputLabel id="demo-simple-select-outlined-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          label="Sort"
        >
          <MenuItem value={""}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"new"}>New User</MenuItem>
        </Select>  
 

      </FormControl>

      <FormControl component="fieldset" className={classes.formControl} >
           <Button onClick={() => handleClear() }
        variant="contained" 
        color="secondary"
      >
          Clear
      </Button>
      </FormControl>

<Divider/>
</Grid>
      

    {
      < Grid container spacing={3}  > 
        <Grid  cellheight={'auto'} className={classes.gridList} cols={1}  >
            {  usersList.map(user => 
                <Grid item  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                  <UsersCard key={user._id.toString()} user={user}  />
                </Grid >
              )
            }
        </Grid>        
      </Grid>   
    }

      </Container>  
       )
  
  }

  export default UsersList;

