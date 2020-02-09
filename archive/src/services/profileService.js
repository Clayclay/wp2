
import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/profile`);
    return res.data || [];
  }

  
}

// a service to make requests to the backend application