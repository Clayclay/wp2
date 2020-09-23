import React , { useContext, useState , useReducer } from 'react';
import CodeForm from './CodeForm';
import ResetForm from './ResetForm';
import NewPasswordForm from './NewPasswordForm';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Copyright from "../../function/Copyright";

/*
 3 stage process
// 1 mail
// 2 code receive by mail
// 3 reset pswd

    COMPONENT :

    -reset pswd MAIN
    -ResetForm  stage=1
    -CodeForm  stage=2
    -NewPasswordForm stage=3

    SWITCH: 

    STEPPER: 
    https://codesandbox.io/s/cvdid?file=/demo.tsx


*/

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

const ResetPassword = () => {
  const classes = useStyles();


    const initialState = {
     
      isSubmitting: false,
      errorMessage: null
    };

    const [email, setEmail] = useState(null);
    const [code, setCode] = useState(null);
    const [password, setPassword] = useState(null);
    const [ confirmPassword, setConfirmPassword]= useState(null);

    const [stage, setStage] = useState()
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(/*new Set<number>()*/);
   
    const PswdReducer = (state,action) => {

      switch (action.type) {
        case 0 :
          return <ResetForm    /> ;
        case 1:
            return <CodeForm    />;
        case 2:
            return <NewPasswordForm   />;
        default:
            return 'Unknown step';
  
      }
    }
    const [state, dispatch] = useReducer(PswdReducer, initialState);

    return(
<Container component="main" maxWidth="xs">
<div className={classes.paper}>
<Typography component="h1" variant="h5">
Reset Password
</Typography>

</div>
<Box mt={8}>
    <Copyright />
</Box>
</Container>


    )
}


 export default ResetPassword;