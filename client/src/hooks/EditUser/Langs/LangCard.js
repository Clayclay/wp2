import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';

const LangCard = ({language , onDelete}) => {
    const languageId =language._id;

    return(
        <Box component="span" m={1}>
            {language.nativName}
            <IconButton variant="contained" onClick={(e) => onDelete(  languageId, e ) } aria-label="delete" >
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </Box>
    );

}

export default LangCard;