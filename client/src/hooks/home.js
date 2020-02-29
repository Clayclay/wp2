import React, { useEffect } from 'react';



const Home = () => {

  const initialState = {
  content:'Loading...'
  };
  const [message, setMessage] = React.useState(initialState);


useEffect(() => {
    
    fetch('/api/home')
      .then(res => res.text())
      .then(res =>   setMessage({ content: res })    );
        
  },[]);
  

  return (
    <div>
<p>{message.content}</p>


</div>
  );

}
export default Home;

