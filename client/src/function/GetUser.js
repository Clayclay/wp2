export function getUser(id) {
return  fetch(`http://localhost:5000/api/user/${id}`)
  .then(res => res.json()); 
}
