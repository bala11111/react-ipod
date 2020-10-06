import React from 'react';
import Navbar from './Navbar';
import MainMenu from './MainMenu';
import PlaySong from './PlaySong';
import SongMenu from './SongMenu';
import SongNames from './SongNames';

function Display(props) {
   const {
    active ,
    menuItems, 
    songItems,
    songs, 
    currentSongIndex, 
    currentMenuIndex, 
    pause, 
    audio, 
    notification 
   } = props;

   return (
       <div className="Display">

         <Navbar 
         
           pause = {pause}
           notification = {notification}
           songs = {songs}
           currentSongIndex = {currentSongIndex}
         />

         { currentMenuIndex === -1 &&
         
             <MainMenu
                active = {active}
                menuItems ={menuItems}
                currentSongIndex = {currentSongIndex}
                songs = {songs}
             />
         }   

         {
           (currentMenuIndex === 0 || currentMenuIndex ===8) && 

           <PlaySong
           
           audio = {audio}
           pause = {pause}
           currentSongIndex = {currentSongIndex}
           songs= {songs}
           />
         }

          {
           currentMenuIndex === 1 && 

           <SongMenu
           
           active = {active}
           songItems = {songItems}
           />
         }

        {
           currentMenuIndex === 2 && 

           <h1 className="dispheader">Game</h1>
         }

        {
           currentMenuIndex === 3 && 

           <h1 className="dispheader">
             Settings
           </h1>
         }

        {
           currentMenuIndex === 4 && 

           <SongNames 
              active = {active}
              songs = {songs}
           />
         }   

         {
           currentMenuIndex === 5 && 

           <h1 className="dispheader">
             Artists
           </h1>
         }     

        {
           currentMenuIndex === 6 && 

           <h1 className="dispheader">
             Albums
           </h1>
         }

        {
           currentMenuIndex === 7 && 

           <h1 className="dispheader">
             Playlists
           </h1>
         }
       </div>
   );
}

export default Display;