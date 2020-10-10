import React , {useState} from 'react';

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles,  createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
   
  }),
);

const EmailForm = ( {handleEmailSubmit} ) => {
    const classes = useStyles();

    const initialState = {
        email : "",
        submitting: false,
        serverError: null,
      }

    const [userEmail, setEmail] = useState(initialState);


      const handleInputChange = event => {
        setEmail({ 
          ...userEmail,
          [event.target.name]:  event.target.value}
        );        
      };

    return ( 

        
<div>
    <Typography variant="subtitle1" >
    Please provide your account email address to request a password reset code. You will receive your a code to your email address if it is valid.
    </Typography>

    <form onSubmit={(e)=>handleEmailSubmit( userEmail.email, e)}>

    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={userEmail.email}
        onChange={handleInputChange}
    /> 
    
    <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={userEmail.isSubmitting}
    >
        {userEmail.isSubmitting ? (
            "Processing..."
        ) : (
            "Send Password Reset Email"
        )}
    </Button>

</form>
</div>

    )
}



export default EmailForm;