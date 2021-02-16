import React, {useEffect,useState} from 'react';

const GetName = ({id})  =>  {

const [name, setName] =useState( [] );

useEffect(() => {
  
  fetch(`/api/user/${id}`, {
    headers: {  }
  })
  .then(res => {
      if (res.ok) {
        //console.log('res',res)
        return res.json();
      } else {
        throw res;
      }
    })
    .then(resJson => {
     //console.log(resJson);
     setName(resJson);
    })
    .catch(error => {
      console.log(error);
     
    });

}, [id]);
  

return (
    
    <div>{name.nickname}</div>
        
    )
}

export default GetName;