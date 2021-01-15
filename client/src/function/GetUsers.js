export function getUsers(id) {
    return fetch(`http://localhost:5000/api/users/${id}`, {
    method: 'GET',
      headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(res => res.json());
  }