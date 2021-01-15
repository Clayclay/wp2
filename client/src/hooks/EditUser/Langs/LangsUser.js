import React , {  useContext} from 'react';
import { authContext } from "../../../App";
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => 
    createStyles({
        root: {
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          padding: theme.spacing(0.5),
          margin: 0,
        },
        chip: {
          margin: theme.spacing(0.5),
        },
}));

const LangsUser = ( {handleDelete,languages} ) => {
    const classes = useStyles();

    const { } =useContext(authContext);
    const preventDefault = (event) => event.preventDefault();


    return(
      <div className={classes.root}>
   
        {   languages.map((language) => {
            let icon;
            if (language.nativName === 'React') {
                icon = <TagFacesIcon />;
              }
        
        return( 

            <li key={language._id.toString()}>

                <Chip
              icon={icon}
              label={language.nativName}
              variant="outlined" 
              /*onDelete={(e) => onDelete(  language, e ) }*/
              onDelete={(e) => handleDelete(language._id,e)}
              className={classes.chip}
                />  

            </li>

        );
        })}
 
 
       </div>    
    )
}

export default LangsUser ;