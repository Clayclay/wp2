import React, { useState , useContext} from 'react';
import {  Link } from "react-router-dom";
import * as ACTION_TYPES from '../../../store/actions/action_types';
import { initialState } from "../../../store/reducers/auth_reducer";

import { authContext } from "../../../App";
import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  }));

  

export const EditAlbum = (album) => {
    const classes = useStyles();

    const { state: authState, dispatch } = useContext(authContext);
    const id = authState.user._id;    
    
    const [user, setUser] = useState(initialState);
    const [data, setData] = useState([]);


  const handleInputChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

    return(
        <div>
 {album.title}
 <label htmlFor="title">
              Title
              <input
              //On relie les champs
                type="text"
                value={album.title}
                onChange={handleInputChange}
                name="city"
                id="city"
                placeholder={album.title}
              />
            </label>

 {album.description}
        

      </div>
    )
}


export default EditAlbum;