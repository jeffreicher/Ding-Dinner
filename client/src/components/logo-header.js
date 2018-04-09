import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogoHeader extends Component {
    render() {
        console.log(this.props);
        return (
            <header className="groceryHeader z-depth-2">
                    {(this.props.back) ? <div className="groceryBack"><Link to='/mymeals'><i className="fas fa-arrow-left iconcolor"></i></Link></div> : ''}
                    <div className="groceryLogo lobsterFont">Ding</div>
                    {(this.props.add) ? <div className="groceryAdd"><Link to='/meal-number'><i className="far fa-plus-square"></i></Link></div> : ''}
            </header>
        );
    };
};

export default LogoHeader;