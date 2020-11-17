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

  const { state: authState, dispatch } = useContext(authContext);
  const [usersList, setUsersList] = useState(users);
  const [blockFilter]= useState(blockedusers .concat(blockedbyusers));
  
  const [cityFilter, setCityFilter] = useState('');
  const [langFilter, setLangFilter]= useState(''); 
  const [genderFilter, setGenderFilter]= useState('');
  
  const handleSelectLang = (selectlang, e) => {
    e.preventDefault(); 
    setLangFilter(
      {
        ...selectlang
      });
      dispatch({ 
        type: ACTION_TYPES.ADD_FILTER,
        payload: langFilter // qqchose
      })
  };   

  const clearFilter=() => {
    setLangFilter('');
     setCityFilter('');
     setGenderFilter('')
  }

  const filters = {
    gender: (gender) => gender === genderFilter,
    city: (city) => city === cityFilter ,
    languages: (languages) =>
      languages.some(({ langue }) => langue === langFilter), 
    _id: (_id) => _id !== blockFilter, 
    
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
   
  console.log("filterarray", filterArray(users, filters));

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


 console.log("users",users)
 console.log(
 "cityFilter",cityFilter,
 "langfilter",langFilter,
 "blockfilter",blockFilter
 );

  
       return (
  
        <div className={classes.root}>
        <div className="users__filter">
        
        <FormControl className={classes.formControl}>
          
          <SelectLangs handleSelectLang={handleSelectLang} />
        
          <SelectCity   setCity={setCityFilter} />
       
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

