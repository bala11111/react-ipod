import React from 'react';

function SongMenu(props)
{
    const{
        active,
        songItems
    } = props;

    return (
        <div className="music">
          <h2>Music</h2>
          <ul className="song-menu-ul">
                {songItems.map((element, index)=>{
                            return active===index?
                            <li key={index} className="on">&nbsp;{element}</li>:
                            <li key={index}>&nbsp;{element}</li>
                        })}
                </ul>
        </div>
    )
}

export default SongMenu;