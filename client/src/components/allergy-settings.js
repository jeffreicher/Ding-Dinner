import React, { Component } from 'react';
import Header from './header';
import Button from './button';
import Next from './next_button';
import '../assets/css/allergy-selection.css';
import {Link} from 'react-router-dom';

class AllergySettings extends Component {
    render() {
        return (
            <div className="container">
                <Header title={'Any Allergies?'} />
                <div className="row">
                    <Button title={'Gluten'} style={'button'} />  
                    <Button title={'Dairy'} style={'button'} />     
                    <Button title={'Tree Nut'} style={'button'} />   
                    <Button title={'Peanuts'} style={'button'} />   
                    <Button title={'Shellfish'} style={'button'} />
                    <Button title={'Soy'} style={'button'} />
                    <Button title={'Egg'} style={'button'} />
                    <Button title={'Wheat'} style={'button'} />
                    <Button title={'Sesame'} style={'button'} />
                    <Button title={'Seafood'} style={'button'} />
                </div>  
                <div className="right bottom"><Link to='/settings'>
                <Next style={'bottom'} name='Done'/>
                </Link></div>
            </div>
        );
    };
};

export default AllergySettings;