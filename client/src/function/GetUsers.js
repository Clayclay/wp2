export function getUsers(id) {
    return fetch(`http://localhost:5000/api/users/${id}`)
      .then(res => res.json());
      
  }