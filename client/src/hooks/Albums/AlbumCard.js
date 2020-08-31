import React,{ useContext } from 'react';
import { authContext } from "../../App";

import AddImage from "./AddImage";



const AlbumCard = ({album, id , onDelete}) => {

    const { state: authState , dispatch } = useContext(authContext);

//console.log(album.images);

    // <Image image={image.filename.toString()}  /> ADD TO .MAP
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
