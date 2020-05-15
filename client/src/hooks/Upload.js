import React, { Component , useContext} from 'react';
import axios from 'axios';

import { authContext } from "../App";

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      selectedFile: '',
    };
  }

  onChange = (e) => {
    switch (e.target.name) {
      case 'selectedFile':
        this.setState({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {  selectedFile } = this.state;
    let formData = new FormData();

   
    formData.append('avatar', selectedFile);

    axios.put(`http://localhost:5000/api/user/5e5fce448608ec1d54ab9d14`, formData)
      .then((result) => {
        // access results...
      });
  }

  render() {
    const {  selectedFile } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        
        <input
          type="file"
          name="selectedFile"
          onChange={this.onChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Upload ;