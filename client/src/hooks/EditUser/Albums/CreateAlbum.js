import React , { useContext, useState } from "react";
import { authContext } from "../../../App";
import * as ACTION_TYPES from '../../../store/actions/action_types';

const initialState = {
  title : "",
  description: "", 
}

const CreateAlbum = () => {

const { state: authState , dispatch } = useContext(authContext);
const id = authState.user._id;
const [data, setAlbum] = useState(initialState);

const handleInputChange = event => { 
  setAlbum({
    ...data,
    [event.target.name]: event.target.value
  }); 
};

const handleCreate = (event) => {
  event.preventDefault();
  setAlbum({
    ...data,
    isSubmitting: true,
    errorMessage: null
  });
  fetch (`http://localhost:5000/api/user/${id}/albums` ,{ 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
  },
    body: JSON.stringify({         
      title: data.title,
      description: data.description,   
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
      throw res;   
  })
  .then(resJson => {
    alert("Album is successfully created");
    dispatch({ 
      type: ACTION_TYPES.USER_INPUT_CHANGE,
      payload: resJson
    })
  })
  .catch(error => {
    console.error(error);
      setAlbum({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
  });
};   
  return(
    <div className="" >

    <h3>New Album</h3>
    <form onSubmit={handleCreate}>

      <label htmlFor="title">
        Title
        <input
          //On relie les champs
            type="text"
            value={data.title}
            onChange={handleInputChange}
            name="title"
            id="title"
          />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          value={data.description}
          onChange={handleInputChange}
          name="description"
          id="description"
        />
      </label>

    <button onClick={handleCreate}>   Create new Album </button>        
    </form>

    </div>
  )
}

export default CreateAlbum ; 