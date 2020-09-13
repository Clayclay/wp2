import React, {useContext} from 'react';
import LangCard from './LangCard'
import CreateLangs from './CreateLangs'

import { authContext } from "../../../App";

const Langs = ( handleDeleteLang, handleSelectLang) => {
const { state: authState } =useContext(authContext);

    return(
        <div>       
        {authState.user.languages && 
        authState.user.languages.map(language => (            
          <LangCard  key={language._id.toString()} language={language} onDelete={handleDeleteLang}  />
          ))}
       <CreateLangs onSubmit={handleSelectLang}  />
        </div>
    )
}

export default Langs ;