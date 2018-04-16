import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/general.css';
 
class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Link to='/mymeals'><i className={`far fa-list-alt ${this.props.currentPage === 'meals' ? 'teal-text' : 'white-text'}`}></i></Link>
                <Link to='/grocery'><i className={`fas fa-shopping-cart ${this.props.currentPage === 'grocery' ? 'teal-text' : 'white-text'}`}></i></Link>
                <Link to='/settings'><i className={`fas fa-cogs ${this.props.currentPage === 'settings' ? 'teal-text' : 'white-text'}`}></i></Link>
            </footer>
        );
    };
};

export default Footer;