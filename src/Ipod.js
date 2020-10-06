import React from 'react';
import Rotate from './Rotate';
import Display from './Display';

function Ipod(props){
    const {
        active ,
          menuItems ,
          songItems ,
          songs ,
          currentSongIndex,
          currentMenuIndex,
          pause ,
          audio ,
          history,
          Max_index_menu ,
          currentMenu ,
          notification ,
          playPause,
          forwardSong,
          reverseSong,
          updatePointer,
          navigateForward,
          navigateBackward
    } = props ;

    return (
        <div className="Ipod">

            <Display
            
            active = {active}
            menuItems = {menuItems}
            songItems = {songItems}
            songs = {songs}
            currentSongIndex = {currentSongIndex}
            currentMenuIndex = {currentMenuIndex}
            pause = {pause}
            audio = {audio}
            notification = {notification}
            
            
            />

            <Rotate
           
           active = {active}
           currentMenuIndex = {currentMenuIndex}
           playPause = {playPause}
           forwardSong = {forwardSong}
           reverseSong = {reverseSong}
           updatePointer = {updatePointer}
           navigateBackward = {navigateBackward}
           navigateForward = {navigateForward}
        
            />
        </div>
    )
}


export default Ipod;