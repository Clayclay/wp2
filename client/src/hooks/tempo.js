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



ARRAY

const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>



function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Bonjour !</h1>
      {unreadMessages.length > 0 &&
        <h2>
          Vous avez {unreadMessages.length} message(s) non-lu(s).
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);




app.get(`/api/user/:id/langs/:langid/del`, async (req, res) => {
  const { id,langid } = req.params;
  const user = await User.findByIdAndUpdate(   id, { new:true  }   );
  user.languages.pull(langid);
  user.save(function (err) {
    if (err) {
      res
        .status(500)
        .json({ error: "Error deleting language please try again." });
      console.log(err);
    } else {
      res.status(200).json({ ok: true, user });
    }
  });
});



////LINK/////
<CardActionArea  component={Link}  onClick={e => (!user._id) ? e.preventDefault() : null} to={`/user/${user._id}`}  >





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