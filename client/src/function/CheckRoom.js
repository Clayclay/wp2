export function checkRoom(id, idProfile){
return  fetch(`/api/room/${id}&${idProfile}` ,{ 
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