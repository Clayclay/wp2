import React, {useContext } from 'react';
import { Link } from 'react-router-dom';
import {authContext} from '../../App';

import './Menu.css';

const Menu = () => {

    const {  state }  = useContext(authContext);
    //const useCurrentUser = ( ) => useContext(authContext);
    const { user: { _id } = {} } = state;
    
    return(
     <div>
        <ul>
        <li><Link to="/">Home </Link></li> 
        <li><Link to="/users">Users List </Link></li>    

        <li><Link onClick={e => (!_id) ? e.preventDefault() : null} to={`/edit`}>Edit</Link></li>
        
        

        <li><Link to="/mailbox">mailbox </Link></li>   

        </ul>
    </div>
)
    }

export default Menu;