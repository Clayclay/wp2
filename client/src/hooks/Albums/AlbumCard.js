import React from 'react';

import AddImage from "./AddImage";

const AlbumCard = ({album}) => {
    
    return(
        <div className = "">
            
            <h3>Album title : {album.title}</h3>
            <p>Album description : {album.description}</p>
            <p>Album id: {album._id}</p>
            <AddImage AlbumId={album._id} />

            {album.images && album.images.map(image => {
                return <li key={image} >  {image}</li>
            })}

        
        </div>   
    );
}

export default AlbumCard;