import React , { useEffect, useContext, useState } from 'react';

import { authContext } from "../App";
import { createStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import {getLangs} from './GetLangs';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Input from '@material-ui/core/Input';

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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
/*
function getStyles(language, selectlang, theme) {
  return {
    fontWeight:
    selectlang.indexOf(JSON.stringify(language.nativName)) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}*/

export default function  SelectLangs({handleSelectLang}) {

  const { state: authState } =useContext(authContext);
  const classes = useStyles();
  const theme = useTheme();
  //to display all lang
  const [langs, setLangs]=useState({})

  const [selectlang, setSelectLang]=useState('');
  //const [lvl,setLvl]=useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect( () => {

    let isSubscribed = true
   
    getLangs()
      .then( langs => { 
        if (isSubscribed) {}
      setLangs(langs);
    });
  
    setLoading(false);
    console.log("langs",langs)  
    return () => isSubscribed = false
    
    }, [authState.token]);
   
   //MULTI FOU LA MERDE
  const handleChange = event /*({target})*/ => {
    //const value = JSON.parse(target.value); => car OBJET
    setSelectLang(  event.target.value );
    
      /*{
        ...userlang,
        [event.target.name]: event.target.value,   
      }*/
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
          <InputLabel id="select-lang">Language</InputLabel>
          <Select 
            labelId="select-lang"
            id="mutiple-lang"
            onChange={handleChange} 
            value={selectlang}
            input={<Input/>}
            MenuProps={MenuProps}
            >
          {langs.length > 0 && 

              langs.map(language => (
                <MenuItem  key={language._id}  value={language } 
                //style={getStyles(language, selectlang, theme)}
                 >
                {language.nativName}
              </MenuItem>

              /*<option key={language._id} 
              value={[JSON.stringify(language) ]}>
                {language.nativName}</option>*/
          ))}
          </Select>
          </FormControl>


          <Button onClick={(e) => handleSelectLang(selectlang, e) }
          
          >Add languages</Button>

          
</>
        )}
 
    </div>
    
  );
};




