import React , { useState, useEffect, useContext } from 'react';
import UsersCard from './UsersCard';
import './Users.css';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';

import SelectCity  from '../../function/City/SelectCity';
import SelectLangs from '../../function/SelectLangs';

import * as ACTION_TYPES from '../../store/actions/action_types';
import { initialState } from "../../store/reducers/auth_reducer";
import { authContext } from "../../App";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    
  },
  gridList: {
    width: 500,
    //height: 450,

  },
  search: {
    margin: '5px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
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

const UsersList = ({users , blockedusers, blockedbyusers }) => {
  const classes = useStyles();

  const [usersList, setUsersList] = useState(users);
  const [blockFilter]= useState(blockedusers .concat(blockedbyusers));
  
  const [cityFilter, setCityFilter] = useState('');
  const [langFilter, setLangFilter]= useState(''); 
  const [genderFilter, setGenderFilter]= useState('');  
  
  const { state: authState, dispatch } = useContext(authContext);

  const [filters,setFilters]=useState([]);
  const [filter,setFilter]=useState('');

///TODO si plusieurs lang selectioner ect
  const handleSelectLang = (selectlang, e) => {
    e.preventDefault(); 

    setFilters((prevFilters) =>
    prevFilters.concat({filter: selectlang.nativName,
      languages: (languages) =>
        languages.some(({ langue }) => langue === selectlang.nativName),
    })
    );
    /* Mutate State !!! ne pas faire
    filters.push( {
      languages: (languages) =>
        languages.some(({ langue }) => langue === selectlang) 
      } )
    setFilters(filters)
     */

  /*dispatch({ 
    type: ACTION_TYPES.ADD_FILTER,
    payload: filters
  })*/
  };   

  const handleDeleteLang= (selectlang,e)=>{
    e.preventDefault(); 
  }

  const handleCitySubmit = (event) => {
    event.preventDefault();

    setFilters((prevFilters) =>
    prevFilters.concat({filter:cityFilter.name,
      city: (city) => city === cityFilter.name 
    })
    );
    /*dispatch({ 
      type: ACTION_TYPES.ADD_FILTER,
      payload: filters
    })*/
  }

  
console.log("austateFilter", authState.filter );
console.log("filters",filters.map((item)=> item.filter));

  const clearFilter=() => {
    setFilters([]);
     
  }

  const filtersTempo = {
    gender: (gender) => gender === genderFilter,
  };

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
   
  //console.log("filterarray", filterArray(users, filters));

  useEffect(() => {
    let filteredUsers = users;
    if (blockFilter !=='' ){
      blockFilter.map(  (item)  =>  (  
        filteredUsers = users.filter((user) => !blockFilter.includes(user._id))
      ));
      setUsersList( filterArray(filteredUsers, filters) );
    }

    setUsersList(filterArray(users, filters));
  }, [users]);

  
       return (
  
        <div className={classes.root}>
        <div className="users__filter">

        
        <FormControl className={classes.formControl}>
          <SelectLangs handleSelectLang={handleSelectLang} />
        </FormControl>

        <FormControl onSubmit={handleCitySubmit} className={classes.formControl}>
          <SelectCity   setCity={setCityFilter} />

          <Button 
          variant="contained" 
          onClick={handleCitySubmit}
          color="primary"
          >   Filter  </Button>    
        </FormControl>

        <button onClick={() => clearFilter() }>
          Clear Filter
        </button>
        </div>
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
            
       
    
    </div>
       )
  
  }

  export default UsersList;

