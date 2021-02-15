export function getUser(id) {

return fetch(`/api/user/${id}`, {
  method: 'GET',
    headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json()); 
}



