import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LogoHeader from './logo-header';

class Settings extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div>
            <LogoHeader />
            <div className='settingsContainer'>
                <h2 className='settingsHeader'>Settings</h2>
                <button className='settingsButton'><Link to='/diet-settings'>Reset Filters</Link></button>
                <br/>
                <button className='settingsButton'><Link to='meal-num-settings'>Add Meals</Link></button>
                <br/>
                <button className='settingsButton'><Link to='/'>Logout</Link></button>
            </div>                
            </div>

        )
    }
}

export default Settings;