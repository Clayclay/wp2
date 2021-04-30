import React, {useContext, useState, useEffect} from 'react';
import {authContext} from '../../App';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import {getUser} from '../../function/GetUser';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

import * as ACTION_TYPES from "../../store/actions/action_types"

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
      },
      img: {
        height: 340,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
      },
}));

const Match = () => {

    const classes = useStyles();
    const { state: authState , dispatch }  = useContext(authContext);
       
    const [activeStep, setActiveStep] = useState(0);

    const [matchArray, setMatchArray] = useState(authState.user.friendsby.filter((id) => !authState.user.friends.includes(id) ))
    //const matchArray = array.filter((id) => !authState.user.friends.includes(id) );
    const maxSteps = matchArray.length;
   
    /* GET USER */
    const [ loading, setLoading] = useState(false);
    //const [error, /*setError*/] = useState(null);
    const [user,setUser]=useState([]);
 

  const handleFriend = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
    fetch (`/api/user/${authState.user._id}/friend` ,{ 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`
  },
  body: JSON.stringify({         
    userId: user._id,
  })
})
.then(res => {
  if (res.ok) {
    return res.json();
    }
    throw res;   
})
.then(resJson => {
  alert("Friend is add to your list");
  dispatch({ 
      type: ACTION_TYPES.USER_INPUT_CHANGE,
      payload: resJson
    })
    console.log("res",resJson.user)
    setMatchArray(resJson.user.friendsby.filter((id) => !resJson.user.friends.includes(id) ))

})
  .catch(error => {
  console.error(error);
});  
  };

  const handleNoFriend = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
     fetch (`/api/user/${authState.user._id}/block` ,{ 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({         
        userId : user._id ,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
        }
        throw res;   
    })
    .then(resJson => {
      //alert("User is block");
      dispatch({ 
          type: ACTION_TYPES.USER_INPUT_CHANGE,
          payload: resJson
        })
    })
      .catch(error => {
console.error(error);
       
    });  
  };

  /*const handleStepChange = (step) => {
    setActiveStep(step);
  };*/

  let sourceImg;
if(user.avatar !== undefined)
{   sourceImg="/uploads/" + user._id + "/" + user.avatar}
else{  sourceImg="avatar.png"}
  
console.log("array",matchArray,activeStep);

       
useEffect(()  =>  {
  setLoading(true);
  getUser(matchArray[activeStep])
  .then( response => {
  setUser(response) 
  setLoading(false);      
  })  
},[authState.token,matchArray[activeStep]]);


    return (

        <Container component="main" maxWidth="xs"   >

        <div className={classes.root}>
      
      { matchArray.length === 0  &&
        <Typography> Empty friend's list request</Typography>
      }
    
       { matchArray && matchArray.length > 0 &&
       <div> 

        <Paper square elevation={0} className={classes.header}>
        <Typography>{user.nickname}</Typography>
      </Paper> 
      
       <img
        className={classes.img}
        src={sourceImg}
        alt={'img'}
      />
 
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          <Button color="primary" size="small" onClick={handleFriend} >
           <PersonAddIcon/>
        </Button>
         
        }

        backButton={
          <Button size="small" onClick={handleNoFriend}>         
          <PersonAddDisabledIcon/>
        </Button>
      
        }
      />

      </div>
        }

    </div>
        </Container>

     
)

    
}

export default Match ;
