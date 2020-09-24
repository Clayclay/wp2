import React from 'react';
import './InfoBar.css';

import closeIcon from '../../../icons/closeIcon.png';

import GetUser from '../../../function/GetUser';

//here we receive room propriety
const InfoBar = ({receiver}) => (
<div className="infoBar">
    <div className="leftInnerContainer">

        <GetUser id={receiver}></GetUser>
          
    </div>
    <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close" /></a>
    </div>
</div>

)

export default InfoBar;