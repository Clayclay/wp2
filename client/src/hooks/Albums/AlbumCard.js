import React from 'react';

import AddImage from "./AddImage";
import Image from "../Image";

const AlbumCard = ({album}) => {

    console.log(album.images);

    // <Image image={image.filename.toString()}  /> ADD TO .MAP
    
    return(
        <div className = "">
            
            <h3>Album title : {album.title}</h3>
            <p>Album description : {album.description}</p>
            <p>Album id: {album._id}</p>

           
            {album.images && album.images.map(image => {
           return <li key={image._id} >  image:{image.filename.toString()} </li>
        })}
          


            <AddImage AlbumId={album._id} />

           

        
        </div>   
    );
}

export default AlbumCard;