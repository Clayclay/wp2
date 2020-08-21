import React, { } from 'react';


const Image = ({image}) => {

const url = "/uploads/album/" + image;

 return   (
    <div id="image">
       <p><a href="/"><img src={url} alt="image" /></a></p> 
    </div>
    );
};

export default Image   ;