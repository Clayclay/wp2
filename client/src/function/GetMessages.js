export function getMessages(id)   {
return fetch(`http://localhost:5000/api/messages/${id}`)
        .then(res=>res.json());
}


