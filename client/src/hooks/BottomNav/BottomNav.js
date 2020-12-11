import React , {useContext,useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {authContext} from '../../App';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmailIcon from '@material-ui/icons/Email';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';


/* SOCKET IO */
import io from 'socket.io-client';
let socket;

const useStyles = makeStyles({
  root: {
    width: "-webkit-fill-available",
    flexGrow: 1,
    position : "fixed",
    bottom : 0,
  },
});

const BottomNav = () => {
    const {  state }  = useContext(authContext);
    const classes = useStyles();
    const [value, setValue] = useState('recents');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    /* SOCKET IO */ 
    const ENDPOINT = 'http://localhost:5000';
    useEffect(() => {
      socket = io(ENDPOINT); 
      
        // room and message need to be init BEFORE 
    socket.emit('login',{userId: state.user._id})
    return ()=>{
      socket.emit('logout',{userId: state.user._id})
    }
    }, [ENDPOINT]);

return state.is_authenticated ? 
(     
<BottomNavigation value={value} onChange={handleChange} className={classes.root} >

      <BottomNavigationAction 
      component={Link}  to="/"
      label="Home"  value="home" icon={<HomeIcon />} />
 
      <BottomNavigationAction 
      component={Link}  to="/users"
      label="Users" value="Users" icon={<GroupIcon />} />


      <BottomNavigationAction
      component={Link}  to="/mailbox"
       label="Messages"  value="Messages" icon={<EmailIcon/>} />
       
       <BottomNavigationAction
      component={Link}  to="/edit"
       label="Profile"  value="Profile" icon={<AccountCircle/>} />

    
    </BottomNavigation>
) : (<div></div> )  ;

}

export default BottomNav;

