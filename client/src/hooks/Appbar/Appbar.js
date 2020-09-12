import React , {useContext,useState} from 'react';
import { authContext } from "../../App";
import * as ACTION_TYPES from '../../store/actions/action_types';
import axios from 'axios';
import { Link } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  const { state, dispatch }  = useContext(authContext);

  const [auth, setAuth] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {


    setAuth(event.target.checked);


  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return state.is_authenticated ?  (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} 
          onClick={() => {
            axios.get('http://localhost:3000/api/logout')
            .then(() =>
            dispatch({ type: ACTION_TYPES.LOGOUT }) )}} 
          onChange={handleChange} aria-label="login switch" />}
          label={ state.is_authenticated ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            WordPal
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to="/edit" >
                <MenuItem onClick={handleClose} >Profile</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  ): ( 
    <div className="">You are not logged in.
     </div>     ) 
    ;
 
 }



