import React from 'react';

const LangCard = ({language , onDelete}) => {
    const languageId =language._id;

    return(

        <div className="">
            <h4>Lang    : {language.nativName}</h4>
            <button onClick={(e) => onDelete(  languageId, e ) }>Delete Language</button>
        </div>
    );

}

export default LangCard;