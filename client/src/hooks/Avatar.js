import React, { } from 'react';


const Avatar = ({avatar}) => {

const url = "/uploads/avatar/" + avatar;

 return   (
    <div className="avatarContainer">
       <p><a href="/"><img src={url} alt="avatar" /></a></p> 
    </div>
    );
};

export default Avatar   ;