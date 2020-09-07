import React, { } from 'react';


const Avatar = ({avatar}) => {

const url = "/uploads/avatar/" + avatar;

 return   (
    <div id="avatar">
       <p><a href="/"><picture><img src={url} alt="avatar" className="avatar" /></picture></a></p> 
    </div>
    );
};

export default Avatar   ;