import React , {useState,useEffect,useContext}  from 'react';
import { authContext } from "../App";
import {  useParams, Link } from 'react-router-dom';

import Album from './Album';
import Lang from './Lang';
import Friend from './Friend/Friend';

import { makeStyles } from '@material-ui/core/styles';

import PlaceIcon from '@material-ui/icons/Place';

import ChatIcon from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';
import BlockUser from './BlockUser/BlockUser';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

/* UUID FOR CHATID*/
import {checkRoom} from '../function/CheckRoom';
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '288px',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const initState = {
  userProfile: [],
  isFetching: false,
  hasError: false
};

const Profile = () => {
  const classes = useStyles();

  const { state: authState  } = useContext(authContext);
  const id = authState.user._id;
  //const [user, setUser] = useState(initialState);
  const [userProfile, setUserProfile] = useState(initState);
  const [room,setRoom] = useState('');
  
  let params = useParams();
  const idProfile = params.id ;

  /* MATCH */

  const [isMatch, setIsMatch] = useState(false);
  const friendWith = authState.user.friends.includes(idProfile); 
  const friendBy = authState.user.friendsby.includes(idProfile);

  useEffect(()  =>  {
    if( friendWith === true && friendBy === true){
      setIsMatch(true)
    }
    },[authState.token]);


  /****** CHECK ROOM ********/ 
  useEffect(()=>{
    checkRoom( id, idProfile  )
    .then(resJson => {
//console.log("resJson",resJson)
    setRoom(resJson.roomid); 
    })
    .catch(error => {
    console.error("room not found",error);
    setRoom(uuidv4())
    })  
},[authState.token ]);

//console.log("room",room)
  
        useEffect(() => {
          fetch(`http://localhost:5000/api/user/${idProfile}`, {
            method: "GET",
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
             setUserProfile(  resJson );
            })
            .catch(error => {
              console.log(error);
            });
            
        },[idProfile,authState.token]);

  /*      <Link    to="/editAlbum/:id" >
        <Button variant="contained" color="primary">
       <EditIcon/>
        </Button>
      </Link> */

      return(

<Container component="main" maxWidth="xs">
{userProfile.isFetching ? (
<span className="loader">LOADING...</span>
) : userProfile.hasError ? (
<span className="error">AN ERROR HAS OCCURED</span>
) : (
<>

<Grid container alignItems="center" maxwidth="sm">


{/*userProfile.albums.map((album) => ())
var last_element = my_array[my_array.length - 1] */
}


<Card className={classes.card}>
<CardMedia
className={classes.cardMedia}
image= {"/uploads/avatar/" + userProfile.avatar}
title="Image title"
/>

<CardContent>       
<Grid container justify="center" >
{userProfile.languages && 
userProfile.languages.map(language => (            
<Lang key={language._id.toString()} language={language} />
))}
</Grid>

        
<Typography gutterBottom variant="h5" component="h2">
{userProfile.nickname}
</Typography>


<Grid container >
<Grid item ><PlaceIcon  aria-hidden="true" fontSize="small" /></Grid>
<Grid item >  <Typography >{userProfile.city}</Typography></Grid>
</Grid>




<Typography>
{userProfile.gender} {userProfile.age} y.o
</Typography>



<Typography variant="body2" color="textSecondary" component="p">
{userProfile.description}
</Typography>



</CardContent>

<CardActions> 

  { isMatch &&

  <Link onClick={ e => (!userProfile._id) ? e.preventDefault() : null} to={`/chat/${room}/${userProfile._id}`}>
  {/* as no first message random id*/}
  <Button   startIcon={<ChatIcon/>}  className={classes.button}  color="primary">
    Message
  </Button >
</Link>

  }



<Link    to="/editAlbum/:id" >
<Friend  id={id} userId={userProfile._id} />
</Link> 

</CardActions>
      
    </Card>
</Grid>

  {userProfile.albums && userProfile.albums.map(album => {
return <Album key={album._id.toString()} album={album} />
})}




<BlockUser    userId={userProfile._id} id={authState.user._id} />


</>

)}

</Container>
    );
};
export default Profile;



