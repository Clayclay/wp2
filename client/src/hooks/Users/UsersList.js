import React , { useState,useEffect } from 'react';
import UsersCard from './UsersCard';
import './Users.css';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from 'react-router-dom';

import {getLangs} from '../../function/GetLangs';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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

  const [langs, setLangs]=useState({});
  const [loading, setLoading] = useState(false);

  //const [error, setError] = useState(null);
  //const [filter, setFilter] = useState('');

  const [langFilter, setLangFilter]= useState(''); 
  const [blockFilter, ]= useState(blockedusers .concat(blockedbyusers));
  const [usersList, setUsersList] = useState(users);

  //console.log('blockedusers',blockedusers)
  //console.log('blockebydusers',blockedbyusers)
 
  
  useEffect( () => {
      setLoading(true);
      getLangs().then( langs => {
        setLangs(langs);
        setLoading(false);
      });
  }, [users]);
// TO FETCH ALL langs ---> for button

///////////////////////////////////////////////////////////////////////
  const handleFilterChange = (e,filterType) => {
    switch(filterType) {
      case "langFilter": setLangFilter(e.target.value); 
      break;
      default: 
    }
  }
   
      useEffect (  () => {
        let filteredUsers = users ;

        
        if  (langFilter !==''){   
          filteredUsers = users.filter( user => user.languages.some(({ langue }) => langue === langFilter));
        }//else = pour cumuler les if dans le resultat 

        else if (blockFilter !=='' ){
          //filteredUsers =  users.filter(user => user._id === blockFilter);   
          blockFilter.map(  item  =>  (  
            // filteredUsers =  users.filter(user => user._id === item);
            //filteredUsers is all users that are not in your blocked list
            filteredUsers = users.filter((user) => !blockFilter.includes(user._id))
            //include only if different from blockfilter
            //includes is just - does this array include (contain) this valu
            //!blockFilter.includes(user._id) -> where blockFilter doesn't contain the user._id
      
          ))
        }
        else if (blockedbyusers !=''){
          
        }

        setUsersList(filteredUsers)
      },[langFilter]);

/*
    const filteredUsers = filter ? 
      users.filter(user => user._id === filter) : users;*/
    
    /*const filteredUsers = filter ? //.some test for each element
      users.filter( user => user.languages.some(({ langue }) => langue === filter)) : users;
*/


    // const filter = ask if filter ? ( YES there is so filter.user) 
    //: OR (NO there is No filter users)
  
       return (
  
        <div className={classes.root}>

        <div className="users__filter">

        </div>
        <FormControl className={classes.formControl}>
        <InputLabel id="langFilter-label">Language</InputLabel>
        <Select name="langFilter" id="langFilter"    labelId="langFilter-label" onChange={(e) => handleFilterChange(e,"langFilter")} >
       
         {langs.length > 0 &&    
              langs.map(language => (
              <option key={language._id} 
              value={language.langue}>
                {language.nativName}</option>
          ))}

       </Select></FormControl>

 <button onClick={() => setLangFilter('')}>
          Clear Filter
        </button>

    {
      <>
<GridList cellHeight={220} className={classes.gridList} cols={1}  >
{  usersList.map(user => 
                <GridListTile  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                  <UsersCard key={user._id.toString()} user={user}  />
                </GridListTile>
              )
            }
</GridList>        
      </>
    }
            
       
    
    </div>
       )
  
  }

  export default UsersList;



  /* <GridList cellHeight={220} className={classes.gridList} cols={1}  >
            {  filteredUsers.map(user => 
                <GridListTile  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                  <UsersCard key={user._id.toString()} user={user}  />
                </GridListTile>
              )
            }
        </GridList> */