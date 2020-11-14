import React , { useEffect, useContext, useState } from 'react';

import { authContext } from "../App";
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import {getLangs} from './GetLangs';

const useStyles = makeStyles((theme) =>
createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}),
);


function  SelectLangs({handleSelectLang}) {

  const { state: authState } =useContext(authContext);
  const classes = useStyles();

  //to display all lang
  const [langs, setLangs]=useState({})

  const [selectlang, setLang]=useState({});
  //const [lvl,setLvl]=useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect( () => {
    setLoading(true);
    getLangs().then( langs => {
      setLangs(langs);
      setLoading(false);

    });
    }, [authState.token]);
   
   //MULTI FOU LA MERDE
  const handleChange = event /*({target})*/ => {
    //const value = JSON.parse(target.value); => car OBJET
    setLang(  JSON.parse(event.target.value)
      /*{
        ...userlang,
        [event.target.name]: event.target.value,   
      }*/);
     
  } 

 
  return(
  
    <div className="">  

    {loading ? (
          <span className="loader">LOADING...</span>
        ) : error ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>

          <FormControl className={classes.formControl} variant="outlined">
          <select onChange={handleChange} value={selectlang.languages} 
        name="languages"  >
          
          {langs.length > 0 &&    
              langs.map(language => (
              <option key={language._id} 
              value={[JSON.stringify(language) ]}>
                {language.nativName}</option>
          ))}
          </select>
          </FormControl>


          <Button onClick={(e) => handleSelectLang(selectlang, e) }
          
          >Add languages</Button>

          
</>
        )}
 
    </div>
    
  );
};


export default SelectLangs;


