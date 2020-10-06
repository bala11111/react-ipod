import React from 'react';


class PlaySong extends React.Component {

    constructor(props)
    {
        super();
        this.state = {
            currentTime : 0,
        }

        this.intervalId = "";
    }

    //to set the audio time
    componentDidMount(){
        const {audio} = this.props;
        this.setState({
            currentTime : audio.currentTime
        });

        this.intervalId = setInterval(()=>{
            this.setState({
                currentTime : this.props.audio.currentTime
            });
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    render(){
        const {
            pause,
            currentSongIndex,
            audio,
            songs
        } = this.props;

        // to set the current time and duration
        var current = Math.floor(this.state.currentTime/60) + ":" + Math.floor(this.state.currentTime%60);
        var duration = Math.floor(audio.duration/60) + ":" + Math.floor(audio.duration%60);
        const per = {
            width : (this.state.currentTime/audio.duration*100)
        }

        if(duration === "NaN:NaN")
        {
            duration = "0:00";
        }

        if(Math.floor(this.state.currentTime%60 <10))
        {
            current = Math.floor(this.state.currentTime/60) + ":0" + Math.floor(this.state.currentTime%60);
        }

        return (
            <div className="Nowplaying">
                <div className="song_details">
                    <img src={songs[currentSongIndex].img}></img>
                </div> 
                <div className="details_container">
                <h4>{songs[currentSongIndex].name}</h4>
                {!pause && <i className="fa fa-play-circle-o" aria-hidden="true"></i>}
                {pause && <i className="fa fa-pause-circle-o" aria-hidden="true"></i>}
                <div className="song_status">
                   {current}
                   <div className="prog"><div style={per} id="progress-bar"></div></div> 
                   {duration}
                </div>
                </div>
            </div>
        )
    }
}

export default PlaySong;