import React from 'react';
import './InfoBar.css';

import onlineIcon from '../../../icons/onlineIcon.png';
import closeIcon from '../../../icons/closeIcon.png';

//here we receive room propriety
const InfoBar = ({receiver}) => (
<div className="infoBar">
    <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online"/>
        <h3>{receiver}</h3>      
    </div>
    <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close" /></a>
    </div>
</div>

)

export default InfoBar;