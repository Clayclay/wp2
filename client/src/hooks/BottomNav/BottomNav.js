import React , {useState} from 'react';
import { Link, useLocation} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


const useStyles = makeStyles({
  root: {
    width: "-webkit-fill-available",
    flexGrow: 1,
    position : "fixed",
    bottom : 0,
  },
});

const BottomNav = () => {
 
    const classes = useStyles();
    const [value, setValue] = useState(useLocation().pathname);
   
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


return  (     
<BottomNavigation value={value} onChange={handleChange} className={classes.root} >

      
 
      <BottomNavigationAction 
      component={Link}  to="/users"
      label="Users" value="/users" icon={<SearchIcon />} />

      <BottomNavigationAction 
      component={Link}  to="/match"
      label="Match"  value="/match" icon={<ThumbUpAltIcon />} />

      <BottomNavigationAction
      component={Link}  to="/mailbox"
       label="Messages"  value="/mailbox" icon={<EmailIcon/>} />
       
       <BottomNavigationAction
      component={Link}  to="/edit"
       label="Profile"  value="/profile" icon={<AccountCircle/>} />

    
    </BottomNavigation>
) 

}

export default BottomNav;

