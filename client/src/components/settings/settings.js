import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../assets/css/settings.css';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';
import auth from '../general/auth';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.logoutClicked = this.logoutClicked.bind(this);

    };

    logoutClicked(){
        localStorage.removeItem('ding_sessionID');
        this.props.history.push('/');
    }

    render() {
        return (                      
            <div className='settingsContainer'>
                <LogoHeader />
                <div className="mainContainer container">
                    <h4 className='card-panel settingsHeader lobsterFont z-depth-2 grey darken-2 white-text'>Settings</h4>
                    <Link to='/diet-settings'className='settingsButton oxygenFont btn-large btn  grey darken-1'>Reset Filters</Link>
                    <Link to='meal-num-settings' className='settingsButton oxygenFont btn-large btn  grey darken-1'>Add Meals</Link>
                    <div className='settingsButton oxygenFont btn btn-large grey darken-1' onClick={this.logoutClicked}>Logout</div>                    
                </div>
                <Footer currentPage='settings' />  
            </div>      
        );
    };
};

export default auth(Settings);