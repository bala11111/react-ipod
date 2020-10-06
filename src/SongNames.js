import React from 'react';

function SongNames(props)
{
    const{
        active,
        songs
    } = props;

    return (
        <div className="music">
          <h2>Songs</h2>
                <ul>
                {songs.map((element, index)=>{
                            return active===index ?
                            <li key={index} className="on">&nbsp;{element.name}</li>:
                            <li key={index}>&nbsp;{element.name}</li>
                            
                        })}
                </ul>
        </div>
    )
}

export default SongNames;