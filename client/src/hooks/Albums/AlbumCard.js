import React from 'react';

import AddImage from "./AddImage";
import Image from "../Image";

const AlbumCard = ({album, id }) => {

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

            <button
          onClick={() => {
            fetch (`http://localhost:5000/api/user/${id}/albums/${album._id}/del` ,{ 
              headers: {            },
        })
            .then()
          }  
        }>Delete Album</button>

        
        </div>   
    );
}

export default AlbumCard;