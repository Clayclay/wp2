import React, {useState, useContext, createRef}  from "react";
import { authContext } from "../App";


export const Upload = (file) => {
  
  const { state: authState  } = useContext(authContext);
  const id = authState.user._id;

  const initialState = {};
  const [upload, setUpload] = useState(initialState); 

  // Select your input type file and store it in a variable
const input = document.getElementById('fileinput');
const fileInput = createRef();


// This will upload the file after having read it
const  handleSubmit = event => {
  event.preventDefault();

  setUpload({
    avatar: fileInput.current.files[0].name
  });

  fetch(`http://localhost:5000/api/user/${id}`, { // Your POST endpoint
    method: 'PUT',
    headers: { 
              Authorization: `Bearer ${authState.token}`
        },
    body: file // This is your file object
  }).then(
    response => response.json() // if the response is a JSON object
  ).then(
    success => console.log(success) // Handle the success response object
  ).catch(
    error => console.log(error) // Handle the error response object
  );
};

console.log("upload", upload);
   
    return(
      <form onSubmit={handleSubmit} >
        <label>
          Upload file:
          <input type="file" name="name" ref={fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
}


export default Upload ;