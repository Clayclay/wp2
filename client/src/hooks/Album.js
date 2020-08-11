import React from 'react';

const Album = ({album}) => {
    
    return(

        <div className="Albums">
            <h3>Album title : {album.title}</h3>
            <p>Album title : {album.description}</p>
        </div>
    );
}

export default Album;