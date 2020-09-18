import React , { useEffect, useContext, useState } from 'react';
import * as ACTION_TYPES from '../../../store/actions/action_types';
import { authContext } from "../../../App";



import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';



import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';



import MultipleSelect from'./multi';


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




const CreateLangs = () => {
  const { state: authState , dispatch } =useContext(authContext);
  const id = authState.user._id;
  const classes = useStyles();
  const theme = useTheme();

  //to display all lang
  const [langs, setLangs]=useState({})
  //to create userlang
  const [userlang,setLang]=useState({});
  //const [lvl,setLvl]=useState(1);


  useEffect( () => {

    fetch("/api/languages/", {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(resJson => {
        setLangs(resJson);
      })
      .catch(error => {
        console.log(error);
      });
    }, [authState.token]);

    console.log("langs",langs)     

   
  const handleChange = (event) /*({target})*/ => {
    //const value = JSON.parse(target.value);
    setLang(event.target.value
      /*{
        ...userlang,
        [event.target.name]: event.target.value,   
      }*/);
     
  } 

  const handleSelectLang = (event) => {
    event.preventDefault(); 
    //setLvl({...lvl});
    setLang(
      {
        ...userlang,
        isSubmitting: true,
        errorMessage: null
      });
    const parse=JSON.parse(userlang.languages);
    fetch (`http://localhost:5000/api/user/${id}/langs` ,
      { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`
      },
      body: JSON.stringify({      
        languages: parse.languages,
        langue: parse.langue,
        iso:parse.iso,
        nativName:parse.nativName,
        langid:parse._id,
        //lvl: lvl
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        throw res;   
    })
    .then(resJson => {
      alert("Lang is successfully added");
      dispatch({ 
        type: ACTION_TYPES.USER_INPUT_CHANGE,
        payload: resJson
      })
    })
    .catch(error => {
      console.error(error);
        setLang({
          ...userlang,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
    });
  };   
  console.log('userlang', userlang)  

  return(
  
    <div className="">  

<MultipleSelect objetlangs={langs}    />

          <FormControl className={classes.formControl} variant="outlined">
          <select onChange={handleChange} value={userlang.languages} 
        name="languages"  >
          
          {langs.length > 0 &&    
              langs.map(language => (
              <option key={language._id} 
              value={[JSON.stringify(language) ]}>
                {language.nativName}</option>
          ))}
          </select>
          </FormControl>


          <Button onClick={handleSelectLang }
          
          >Add languages</Button>
 
    </div>
    
  );
};


export default CreateLangs;


