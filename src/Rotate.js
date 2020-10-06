import React from 'react';
import ZingTouch from 'zingtouch';


class Rotate extends React.Component {
    constructor()
    {
        super();
        this.angle = 0;
    }

    componentDidMount(){
        const { 
                navigateBackward ,
                playPause, 
                forwardSong , 
                reverseSong 
              } = this.props;
        
        const wheel = document.getElementById("circlee");
        const activeRegion = ZingTouch.Region(wheel);

        const menuBtn = document.getElementById("menu-btn");
        const playPauseBtn = document.getElementById("play-pause-btn");
        const reverseBtn = document.getElementById("reverse-btn");
        const forwardBtn = document.getElementById("forward-btn");
        
        const wheelController = this.wheelController;


        const longTap = new ZingTouch.Tap({
            maxDelay:10000,
            numInputs: 1,
            tolerance: 1,
        })
        
        //for tap gesture
        activeRegion.bind(menuBtn, 'tap', function (e) {
            navigateBackward();
        });       
        activeRegion.bind(playPauseBtn, 'tap', function (e) {
            playPause();
        });
        
        //for rotating gesture
        activeRegion.bind(wheel, 'rotate', function (e) {
             wheelController(e);
         });
        
        //for long taps 
        activeRegion.bind(forwardBtn, longTap, function (e) {
            console.log(e);
            forwardSong(e);
        });
        activeRegion.bind(reverseBtn, longTap, function (e) {
            reverseSong(e);
        });
    
    }
    
 
     wheelController = (e) => {
         const {updatePointer,currentMenuIndex} = this.props;

         if(e.detail.distanceFromOrigin===0)
         {
             this.angle = e.detail.angle;
         }

         if(Math.abs(this.angle-e.detail.angle) > 300)
         {
             this.angle = Math.abs(e.detail.angle);
             if(e.detail.distanceFromLast === 0)
             {
                 return;
             }
             else if(e.detail.distanceFromLast <0)
             {
                 
                 updatePointer(1,currentMenuIndex);
             }else{
                
                 updatePointer(0,currentMenuIndex);
             }
         }else if(Math.abs(this.angle - e.detail.angle) > 15){
             this.angle = Math.abs(e.detail.angle);
             if(e.detail.distanceFromLast ===0)
             {
                 return;
             }
             else if(e.detail.distanceFromLast === 0)
             {
                 
                 updatePointer(1,currentMenuIndex);
             }else{
                
                 updatePointer(0,currentMenuIndex);
             }
             console.log(this.angle);
         }
     }

    render()
    {   
        const {
            active ,
            currentMenuIndex, 
            navigateForward ,
           } = this.props;

        return(
            <div className="rotate-container">
                <div className="circle" id="circlee" >
                    <div className="menu" id="menu-btn">
                        <div>MENU</div>
                    </div>
                    <div className="forward" id="forward-btn">
                        <i className="fas fa-fast-forward"></i>
                    </div>
                    <div className="playpause" id="play-pause-btn">
                        <div>
                            <i className="fas fa-play"></i>
                            <i className="fas fa-pause"></i>
                        </div>
                    </div>
                    <div className="backward" id="reverse-btn">
                        <i className="fas fa-fast-backward"></i>
                    </div>

                    <div className="mid" id="centre-btn" onClick={() => {navigateForward(active, currentMenuIndex)}}></div>
                </div>
             
            </div>
        )
    }
}

export default Rotate;



