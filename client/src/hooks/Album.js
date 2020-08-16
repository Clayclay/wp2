import React from 'react';

const Album = ({album}) => {
    
    return(

        <div className="Albums">
            <h3>Album title : {album.title}</h3>
            <p>Album description : {album.description}</p>
            <div>

                {album.images && album.images.map(image => {
           return <li key={image} >image={image}</li>
        })}
            </div>
        </div>
    );
}

export default Album;