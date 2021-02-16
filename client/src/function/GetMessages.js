export function getMessages(id)   {
return fetch(`/api/messages/${id}`)
        .then(res=>res.json());
}


