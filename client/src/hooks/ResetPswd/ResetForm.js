import React , {useState} from 'react';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
   
  }),
);

const ResetForm = ( {Email} ) => {
    const classes = useStyles();


    const initialState = {
        email : null,
        submitting: false,
        serverError: null,
      }

    const [email, setEmail] = useState(initialState);


      const handleInputChange = event => {
        setEmail({
          ...email,
          [event.target.name]: event.target.value
        });
      };

      const handleFormSubmit = (event) => { //want this method to make a request to authenticate with our backend and save the resulting token to a browser cookie.
        event.preventDefault();
        setEmail({
          ...email,
          isSubmitting: true,
          errorMessage: null
        });
    };

    return( 
        <Container component="main" maxWidth="xs">

            <Typography component="h1" variant="subtitle1">
            Please provide your account email address to request a password reset code. You will receive your a code to your email address if it is valid.
            </Typography>

<form onSubmit={handleFormSubmit}>

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
        value={email}
        onChange={handleInputChange}
    /> 
    
    <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={email.isSubmitting}
    >
        {email.isSubmitting ? (
            "Processing..."
        ) : (
            "Submit"
        )}
    </Button>

</form>

</Container>

    )
}



export default ResetForm;