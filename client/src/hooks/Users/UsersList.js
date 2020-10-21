import React , { useState } from 'react';

import UsersCard from './UsersCard';
import './Users.css';


import Container from '@material-ui/core/Container';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import {Link} from 'react-router-dom';

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        
      },
}));

const UsersList = ({users}) => {
    const classes = useStyles();
    console.log("users from UsersList",users);
    const LANGUAGES = {
    EN: 'english',
    FR: 'french'
  };
  
  const filterEnglishUsers = user => user.langue === LANGUAGES.EN;
  const filterFrenchUsers = user => user.langue === LANGUAGES.FR;
  
  const languageFilters = {
    [LANGUAGES.EN]: filterEnglishUsers,
    [LANGUAGES.FR]: filterFrenchUsers
  };
    
    const [filter, setFilter] = useState('');
    console.log("filter",languageFilters[filter])

    const filteredUsers = filter ? users.filter(user => user.langue === filter) : users;

    // Ne marche pas encore
    const  filtered = users.map((user) => ({
        ...user,
        filtered: user.languages.filter((el) => el.langue === filter).length > 0
      })) ;
      //Marche Moyen 
  
    console.log("filtered",filteredUsers);

    // const filter = ask if no filter ? ( YES there is no filter so only user) 
    //: OR (NO there is filter so users.filter)
  
       return (
  
        <div className={classes.root}>
  
  
        <div className="users__filter">
        <button onClick={() => setFilter(LANGUAGES.FR)}>
          French
        </button>
        <button onClick={() => setFilter('')}>
          Clear Filter
        </button>
        </div>

        {filtered.map((user) =>

user.filtered === true ? 
  <span key={user.nickname}>{user.nickname}</span>
 : 
""
)}
  
  
  <GridList cellHeight={220} className={classes.gridList} cols={1} >
    {
      <>
      {      filteredUsers.map(user => 
        <UsersCard key={user._id.toString()} user={user} />
        )
      }
      </>}
            {/*filteredUsers.map((user) =>
           
  
             <GridListTile  key={user._id.toString()}  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`} >
                    
                      <UsersCard key={user._id.toString()} user={user} />
                      
                  </GridListTile>
            //OR FALSE
  
          )
            */
           }
    </GridList>
    
    </div>
       )
  
  }

  export default UsersList;