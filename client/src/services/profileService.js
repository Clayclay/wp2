//  /client/src/services/productService.js

import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/user`);
    return res.data || [];
  }
}