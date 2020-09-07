import React from 'react';
import AddImage from "./AddImage";

const AlbumCard = ({album , onDelete}) => {
    const albumId = album._id;
    
    return(
        <div className = "">
            
            <h3>Album title : {album.title}</h3>
            <p>Album description : {album.description}</p>
            <p>Album id: {album._id}</p>
           
            {album.images && album.images.map(image => {
           return <li key={image._id} >  image:{image.filename.toString()} </li>
        })}
          
            <AddImage AlbumId={album._id} />
            
            <button onClick={(e) => onDelete(  albumId, e ) }
            /* we raise the props inside superior comp*/ >Delete Album</button>
        
        </div>   
    );
}

export default AlbumCard;
