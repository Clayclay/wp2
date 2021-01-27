export function getUser(id) {

return fetch(`http://localhost:5000/api/user/${id}`, {
  method: 'GET',
    headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json()); 
}



