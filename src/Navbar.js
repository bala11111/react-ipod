import React from 'react';

class Navbar extends React.Component {
    constructor()
    {
        super();
        this.state = {
            time : this.getTimenow()
        }

        this.stateId = ""
    }

    //to set the current time every 1 minute
    componentDidMount()
    {
        this.stateId = setInterval(()=>{
            this.setState({
                time : this.getTimenow()
            });
        },60000);
    }

    //to get the current time
    getTimenow()
    {
        const today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        if(today.getMinutes()<10)
        {
            time = today.getHours() + ":0" + today.getMinutes();
        }
        return time;
    }

    render(){
        const {time} = this.state;
        const {pause} =this.props;
        const {songs} = this.props;
        const {currentSongIndex} = this.props;
        return (
           <div className="navbar">
            <div className="time">
              {time}
            </div>
            <i class="fa fa-battery-half" aria-hidden="true"></i>   
           </div>
        )
    }
}

export default Navbar;