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
        
  });
  

  return (
<p>{message.content}</p>
  )

}
export default Home;

/*
export default class Home extends Component {
  constructor() {
    super();
    //Set default message
    //// `this` est résolu depuis la méthode `render`
    this.state = {
      message: 'Loading...'
    }
  }
  //méthode est appelée par React lui-même, soit pour récupérer les données depuis une API externe,
  componentDidMount() {
    //GET message from server using fetch api
    fetch('/api/home')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}*/