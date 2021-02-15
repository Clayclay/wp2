export function getUsers(id) {
    return fetch(`/api/users/${id}`, {
    method: 'GET',
      headers: {
      'Content-Type': 'application/json'
    }
  })
      .then(res => res.json());
  }