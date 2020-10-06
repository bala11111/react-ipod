import React from 'react';

import songImg from './statics/other_images/songs.png';
import gameImg from './statics/other_images/games.png';
import settingsImg from './statics/other_images/settings.png';

function MainMenu(props){
    const{
        active,
        menuItems,
        songs,
        currentSongIndex
    } = props;

    return (
        <div className="MainMenuContainer">
            <div className="menubar">
                <h3 className="mmheader">Ipod</h3>
                <ul>
                    {
                        menuItems.map((value,index)=>{
                            return active==index ?
                            <li key={index} className="on">&nbsp;{value}</li>:
                            <li key={index}>&nbsp;{value}</li>
                        })
                    }
                </ul>
            </div>
            <div className="sideImg">
                 {active ===0 && <img className="side" src={songs[currentSongIndex].img}></img>}
                 {active ===1 && <img className="side" src={songImg}></img>}
                 {active ===2 && <img className="side" src={gameImg}></img>}
                 {active ===3 && <img className="side" src={settingsImg}></img>}
            </div>
        </div>
    )
}

export default MainMenu;