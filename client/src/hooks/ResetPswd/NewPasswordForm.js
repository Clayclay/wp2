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


const NewPasswordForm = () => {
    const classes = useStyles();

    const [newpswd, SetPassword ] = useState(null)

    const handleInputChange = event => {
        SetPassword({
          ...newpswd,
          [event.target.name]: event.target.value
        });
      };

      const handleFormSubmit = (event) => { //want this method to make a request to authenticate with our backend and save the resulting token to a browser cookie.
        event.preventDefault();
        SetPassword({
          ...newpswd,
          isSubmitting: true,
          errorMessage: null
        });
    };

    return(
        <div>
            <Typography component="h1" variant="subtitle1">
            Please enter new SetPassword
            </Typography>


            <form onSubmit={handleFormSubmit}>

<TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id="pswd"
    label="Password"
    name="password"
    autoComplete="password"
    autoFocus
    value={newpswd}
    onChange={handleInputChange}
/> 

<Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.submit}
    disabled={newpswd.isSubmitting}
>
    {newpswd.isSubmitting ? (
        "Processing..."
    ) : (
        "Submit"
    )}
</Button>

</form>


        </div>
    )
}

export default NewPasswordForm ;