import React, { Component } from 'react';
import Header from './header';
import Button from './button';
import Next from './next_button';
import '../assets/css/diet-selection.css';
import {Link} from 'react-router-dom';

//add method that adds class to add button color when clicked 

class DietSettings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selections: []
        }
    }
    render() {
        return (
        <div className="container">
            <Header title={'What\'s Your Type?'}/>
            <div className="collection center-align">
                <Button title={'Paleo'} descrip={'Live Like Your Ancestors'} style={'button'} />  
                <Button title={'Low Carb'} descrip={'Coachella Bod Meal Plan'} style={'button'} />     
                <Button title={'Vegetarian'} descrip={'Straight Veggies'} style={'button'} />   
                <Button title={'Carnivore'} descrip={'Meat Is Life'} style={'button'} />   
                <Button title={'Pescatarian'} descrip={'Fish N Greens'} style={'button'} />
            </div>  
            <div className="right">
                <Link to='/allergy-settings'><Next /></Link>                  
            </div>     
        </div>
        );
    };
};

export default DietSettings;