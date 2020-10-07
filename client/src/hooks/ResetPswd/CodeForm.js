import React , {useState} from 'react';

import Typography from '@material-ui/core/Typography'

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import { makeStyles,  createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) =>
  createStyles({
   
  }),
);

const initialState = {
    code : "",
    submitting: false,
    serverError: null,
}


const CodeForm = (  {handleCodeSubmit}  ) => {

  const classes = useStyles();
  const [code, setCode] = useState(initialState);


  const handleInputChange = event => {
    setCode({
      ...code,
      [event.target.name]: event.target.value
    });
  };

  return (

        <div>
          
        <Typography component="h1" variant="subtitle1">
        Please provide the code you have receive.
        </Typography>

        <form onSubmit={(e)=>handleCodeSubmit( code.code, e)}>
        
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="code"
                label="Code"
                name="code"
                autoComplete="code"
                autoFocus
                value={code.code}
                onChange={handleInputChange}
            /> 
            
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={code.isSubmitting}
            >
                {code.isSubmitting ? (
                    "Processing..."
                ) : (
                    "Submit"
                )}
            </Button>
        
        </form>
        
        </div>


        )
    
}

export default CodeForm;