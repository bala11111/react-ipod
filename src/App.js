import React from 'react';
import Ipod from './Ipod.js';
import song1 from './statics/songs/kutti.mp3';
import song2 from './statics/songs/vc.mp3';
import song3 from './statics/songs/vr.mp3';
import song1img from './statics/song_images/img1.jpg';
import song2img from './statics/song_images/img2.jpeg';
import song3img from './statics/song_images/img3.jpg';

class App extends React.Component {

  constructor()
  {
    super();

    //The initial States
    this.state = {
      active : 0, //for the active sub menu
      menuItems : [        //menu items
        "Now Playing",
        "Songs",
        "Games",
        "Settings"
      ],

      songItems : [        //song items
        "All Songs",
        "Artists",
        "Albums",
        "Playlists"
      ],

      songs : [                //songs array
        {
          name : "Kutty Story",
          url : song1,
          img : song1img
        },
        {
          name : "Vaathi Comming",
          url : song2,
          img : song2img
        },
        {
          name : "Vaathi Raid",
          url : song3,
          img : song3img
        }
      ],

      currentSongIndex : 0,     //song index
      currentMenuIndex : -1,    //menu index
      pause : true,             //pause state
      audio : new Audio(song1), //the initial audio
      navStack : [],            // to track the history
      Max_index_menu : {        //max index of all main menu
        "-1" : 3,
        1 : 3,
        4 : 2
      },

      currentMenu : {           //sub indexes of main menu
        "-1" : [0,1,2,3],
        "1" : [4,5,6,7]
      },

      notification : false

    }
  }

  // function to pause and play the song
  playPause = () => {
     if(this.state.pause===true)
     {
        this.setState({
          pause : false
        })
         this.state.audio.play();
     }else{
       this.setState({
         pause : true
       })
       this.state.audio.pause();
     }
  }

  //function to move to next songs or fast forward
  forwardSong = (e) => {
    if(this.state.pause===true)
    {
      return;
    }

    if(e.detail.interval < 250)
    {
      this.state.audio.pause();
      let currentSongIndex = this.state.currentSongIndex;
      if(currentSongIndex === this.state.songs.length-1){
        currentSongIndex =0;
      }else{
        currentSongIndex++;
      }

      this.setState({
        currentSongIndex : currentSongIndex,
        audio : new Audio(this.state.songs[currentSongIndex].url)
      },()=> {
        this.state.audio.play()
      });
    }else if(e.detail.interval>250 && e.detail.interval < 10000)
    {
      const interval = e.detail.interval/1000;
      console.log(this.state.audio.currentTime,'......',interval);
      this.setState((prevState)=> {
        prevState.audio.currentTime += interval ;
        return prevState;
      })
    }
  }

  //function to move to previous song or fast backward
  reverseSong = (e) => {
    if(this.state.pause===true)
    {
      return;
    }

    if(e.detail.interval < 250)
    {
      this.state.audio.pause();
      let currentSongIndex = this.state.currentSongIndex;
      if(currentSongIndex === 0){
        currentSongIndex = this.state.songs.length-1;
      }else{
        currentSongIndex--;
      }

      this.setState({
        currentSongIndex : currentSongIndex,
        audio : new Audio(this.state.songs[currentSongIndex].url)
      },()=> {
        this.state.audio.play()
      });
    }else if(e.detail.interval>250 && e.detail.interval < 10000)
    {
      const interval = e.detail.interval/1000;
      this.setState((prevState)=> {
        prevState.audio.currentTime -= interval;;
        return prevState;
      })
    }
  }

  // to change song on click
  changeSong = (id,navStack) => {
    this.state.audio.pause();
    this.setState({
      currentMenuIndex : 8,
      navStack : navStack,
      active: 0,
      pause : false,
      currentSongIndex : id,
      audio : new Audio(this.state.songs[id].url)
    },()=>{
      this.state.audio.play();
    })

    return;
  }

  //updating the active state
  updatePointer = (direction,menu) => {
    
    if(menu!== -1 && menu!==1 && menu!== 4)
    {
      console.log(menu);
      return;
    }
    let minIndex = 0;
    let maxIndex = this.state.Max_index_menu[menu];

    if(direction===1)
    {
      if(this.state.active >= maxIndex)
      {
        this.setState({
          active : minIndex
        });
      }else{
         this.setState({
           active : this.state.active +1
         });
      }
    }else{
      if(this.state.active <=minIndex)
      {
        this.setState({
          active : maxIndex
        })
      }else{
        this.setState({
          active : this.state.active -1
        })
      }
    }
  }

  //going forward menu wise
  navigateForward = (id,lastMenu) => {
    console.log('now:',id,'from',lastMenu);
    const navStack = [...this.state.navStack];
    if(lastMenu!== -1 && lastMenu!== 1 && lastMenu!==4 && lastMenu!==0 && lastMenu!==8)
    {
      return;
    }
    if(lastMenu===-1){
      navStack.push(this.state.currentMenuIndex);
      this.setState({
        currentMenuIndex :id,
        navStack : navStack,
        active:0
      });
      return;
    }
    if(lastMenu===8 || lastMenu===0)
    {
      this.playPause();
      return;
    }
    navStack.push(this.state.currentMenuIndex);

    if(lastMenu===4)
    {
      this.changeSong(id,navStack);
      return;
    }
    
    const currentMenuIndex = this.state.currentMenu[lastMenu][id];
    this.setState({
      currentMenuIndex : currentMenuIndex,
      navStack : navStack,
      active:0
    });

    console.log(navStack);
  }

  //going backward menuwise
  navigateBackward = () => {
    const navStack = [...this.state.navStack];
    if(navStack.length===0)
    {
      return;
    }
    const prev = navStack.pop();
    console.log(prev);
    this.setState({
      currentMenuIndex : prev,
      navStack : navStack,
      active: 0
    });
    return;
  }

  render(){
  return (
    <div className="App">
       <Ipod
          active = {this.state.active}
          menuItems = {this.state.menuItems}
          songItems = {this.state.songItems}
          songs = {this.state.songs}
          currentSongIndex = {this.state.currentSongIndex}
          currentMenuIndex = {this.state.currentMenuIndex}
          pause = {this.state.pause}
          audio = {this.state.audio}
          history = {this.state.history}
          Max_index_menu = {this.state.Max_index_menu}
          currentMenu = {this.state.currentMenu}
          notification = {this.state.notification}
          playPause = {this.playPause}
          forwardSong = {this.forwardSong}
          reverseSong = {this.reverseSong}
          updatePointer = {this.updatePointer}
          navigateForward = {this.navigateForward}
          navigateBackward = {this.navigateBackward}
       />
    </div>
  );
  }
}

export default App;
