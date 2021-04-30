import React , {useState} from 'react';

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
   
  }),
);

const initialState = {
    pswd : "",
    submitting: false,
    serverError: null,
}

const NewPasswordForm = ({handlePswdSubmit}) => {
    
    const classes = useStyles();
    const [pswd, SetPassword ] = useState(initialState)

    const handleInputChange = event => {
        SetPassword({
          ...pswd,
          [event.target.name]: event.target.value
        });
    };


    return(
        <div>
            <Typography component="h1" variant="subtitle1">
            Please enter new password
            </Typography>


            <form onSubmit={(e)=>handlePswdSubmit( pswd.pswd, e)}>

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="pswd"
                label="Password"
                type="password"
                name="pswd"
                autoComplete="password"
                autoFocus
                value={pswd.pswd}
                onChange={handleInputChange}
            /> 

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={pswd.isSubmitting}
            >
                {pswd.isSubmitting ? (
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
