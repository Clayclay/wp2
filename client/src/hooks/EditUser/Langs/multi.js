import React, {ChangeEvent, useState} from 'react';

import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';

import Chip from '@material-ui/core/Chip';

import Button from '@material-ui/core/Button';

/*
Reflechir au meuilleur moyen :
avec update en une fois ou par langue 
*/
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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(lang, personLang , theme) {
  return {
    fontWeight:
      personLang.indexOf(lang) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(objetlangs) {
    const langsArray = Array.from(objetlangs.objetlangs);
    //console.log("langsArray",langsArray)

  const classes = useStyles();
  const theme = useTheme();
  const [personLang, setPersonLang] = useState([]);

  const handleChange = (event) => {
    setPersonLang(event.target.value );
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target ;
    const value=  [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonLang(value);
  };



  const handleSelectLang = (event) => {
    event.preventDefault(); 
    //setLvl({...lvl});
    setPersonLang(
      {
        ...personLang,
        isSubmitting: true,
        errorMessage: null
      });

    //const parse=JSON.parse(userlang.languages);
      console.log("personLang2",personLang)
    /*
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
    });*/
  };   


  return (
    <div>

 
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personLang}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected ).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {langsArray.map((lang) => (
            <MenuItem key={lang._id} value={lang.nativName} style={getStyles(lang, personLang, theme)}>
              {lang.nativName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     
      <Button onClick={handleSelectLang }
          
          >Add languages</Button>

    </div>
  );
}
 

