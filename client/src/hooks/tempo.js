/*
  @Clayclay  Then save your authstate in localstorage when user logged in, 
  so whenever you need it, you grab the data from localstorage. 
  and remove it when user logged out.
  

  ///////////////////////////////////////////////////////////////////////////////////////
  
  TH FOR SOCKET 
  
  
  socket.on("active", ({ username, dbID }) => {
    users.push({ id: socket.id, username, dbID });
    socket.broadcast.emit(
      "status",
      users.map((user) => user.dbID)
    );
  });

heres a simple tipical use of a socket tho

I am emiting an event with name active from the client 
and along with it an object containing
 the keys username and dbID. 
 That object is destructrured in the callback 
 and I am using them however I want bellow. 
 In this case 
 I am emiting an event to 
 all the clients connected to the server at that moment 



////////////////////////////////////////////ARRAY

const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>


////////////////////////////// Props qui descend + function qui remonte
========== Enfant
const LangsUser = ( {handleDelete,languages} ) => {

return (
   onDelete={(e) => handleDelete(language._id,e)})
 
========== Parent

const handleDeleteLang = (languageId, e) => {
    e.preventDefault();
      setUser({
        ...user,
        isSubmitting: true,
        errorMessage: null
    }); 

    return (
<LangsUser handleDelete={handleDeleteLang} languages={authState.user.languages} />

    )
/////////// Props qui remonte ?
const GrandParent = () => {
  const [name, setName] = useState("i'm Grand Parent");
  return (
    <>
      <div>{name}</div>
      <Parent setName={setName} />
    </>
  );
};

const Parent = params => {
  return (
    <>
      <button onClick={() => params.setName("i'm from Parent")}>
        from Parent
      </button>
      <Child setName={params.setName} />
    </>
  );
};

const Child = params => {
  return (
    <>
      <button onClick={() => params.setName("i'm from Child")}>
        from Child
      </button>
    </>
  );
};

  //////////// UNREAD MESSAGE TODO

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);




////LINK/////
<CardActionArea  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`}  >

<BottomNavigationAction 
      component={Link}  to="/"
      label="Home"  value="home" icon={<HomeIcon />} />

<Button component={Link} to={'/my_route'}>My button</Button>


          /////////////////////////FUNCTION////////
/*
          export function getUsers() {
            return fetch("http://localhost:5000/users")
              .then(res => res.json());
          }


          useEffect(() => {
            getUsers()  .then(users => setUsers(users));
          }, [authState.token]);
        
        
*/

/////////////////////////////////ARRAY MAP/////////////////////
  /*
  .map((number) =>
  <li key={number} >{number}</li>


  */
/*PROMISE
 Promise.all([
	fetch('https://jsonplaceholder.typicode.com/posts'),
	fetch('https://jsonplaceholder.typicode.com/users')
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
}).then(function (data) {
	// Log the data to the console
	// You would do something with both sets of data here
	console.log(data);
}).catch(function (error) {
	// if there's an error, log it
	console.log(error);
});
*/


