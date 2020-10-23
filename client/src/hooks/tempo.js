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


////////////////////////////// Props qui remonte
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




  //////////// UNREAD MESSAGE TODO

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);




////LINK/////
<CardActionArea  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`}  >



//////////////////////////////////ETAT QUI REMONTE

fetch("/api/languages/", {
  headers: {
    Authorization: `Bearer ${authState.token}`
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw res;
    }
  })
  .then(resJson => {
    setLangs(resJson)
  })
  .catch(error => {
    console.log(error);
  });
}, [authState.token]);

const handleChange = event /*({target})*/ /*=> {
//const value = JSON.parse(target.value);
/*
setLang(
  {
    [event.target.name]: event.target.value,
    ...userlang,
  });
  console.log(userlang)
} 

const handleSelectLang = (event) => {
event.preventDefault(); 
//setLvl({...lvl});
setLang(
  {
    ...userlang,
    isSubmitting: true,
    errorMessage: null
  });
const parse=JSON.parse(userlang.languages);
fetch (`http://localhost:5000/api/user/${id}/langs` ,
  { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authState.token}`
  },
  body: JSON.stringify({      
    languages: parse.languages,
    langue: parse.langue,
    iso:parse.iso,
    nativName:parse.nativName,
    langid:parse._id,
    //lvl: lvl
  })
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
    throw res;   
})
.then(resJson => {
  alert("Lang is successfully added");
  dispatch({ 
    type: ACTION_TYPES.USER_INPUT_CHANGE,
    payload: resJson
  })
})
.catch(error => {
  console.error(error);
    setLang({
      ...userlang,
      isSubmitting: false,
      errorMessage: error.message || error.statusText
    });
});*/


/*

<BottomNavigationAction 
      component={Link}  to="/"
      label="Home"  value="home" icon={<HomeIcon />} />

<Button component={Link} to={'/my_route'}>My button</Button>
      */


      /*    
        {languages && 
        languages.map((language) => ( 

            <li key={language._id.toString()}>

                {language.nativName}

                <IconButton variant="contained" onClick={(e) => onDelete(  language, e ) } aria-label="delete" >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </li>
          
          
          
        ))}



            /*</FormControl>
          {langs.length > 0 &&    
              langs.map((language) => (
              
              <option key={language._id} 
                  value={[JSON.stringify(language) ]}>
                {language.nativName}
              </option >
          ))}
          </Select>*/




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

