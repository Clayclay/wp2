export function checkRoom(id, idProfile){
return  fetch(`http://localhost:5000/api/room/${id}&${idProfile}` ,{ 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
})
.then(res =>  { 
if (res.ok) {
  return res.json();
} else {
  throw res;
}
})  
}