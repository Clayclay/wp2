import React , { useState,useEffect } from 'react';
import UsersCard from './UsersCard';
import './Users.css';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from 'react-router-dom';

import {getLangs} from '../../function/GetLangs';

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
}));

const UsersList = ({users}) => {
  const classes = useStyles();

  const [langs, setLangs]=useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState('');

    useEffect( () => {
      setLoading(true);
      getLangs().then( langs => {
        setLangs(langs);
        setLoading(false);
  
      });
      }, [users]);

      console.log("langs", langs);

    

   /* const filteredUsers = filter ? 
      users.filter(user => user.langue === filter) : users;*/

    const filteredUsers = filter ? //.some test for each element
      users.filter( user => user.languages.some(({ langue }) => langue === filter)) : users;

    // const filter = ask if filter ? ( YES there is so filter.user) 
    //: OR (NO there is No filter users)
  
       return (
  
        <div className={classes.root}>

{langs.length > 0 &&    
              langs.map(language => (
              <option key={language._id} 
              value={[JSON.stringify(language) ]}>
                {language.langue}</option>
          ))}
  
  
        <div className="users__filter">
        <button onClick={() => setFilter('french')}>
          French
        </button>
        <button onClick={() => setFilter('chinese')}>
          Chinese
        </button>
        <button onClick={() => setFilter('')}>
          Clear Filter
        </button>
        </div>
       



    {
      <>
        <GridList cellHeight={220} className={classes.gridList} cols={1}  >
            {  filteredUsers.map(user => 
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