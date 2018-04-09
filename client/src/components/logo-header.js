import React, { Component } from 'react';

class LogoHeader extends Component {
    render() {
        return (
            <header className="groceryHeader">
                    {/* <div className="groceryBack"><Link to='/mymeals'><i className="fas fa-arrow-left iconcolor"></i></Link></div> */}
                    <div className="groceryLogo lobsterFont">Ding</div>
                    {/* <div className="groceryAdd"></div> */}
            </header>
        );
    };
};

export default LogoHeader;