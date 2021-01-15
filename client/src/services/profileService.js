import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api`);
    return res.data || [];
  }
}

/*
Axios is promise-based and thus we can take advantage of async and await for more readable asynchronous code.  
*/