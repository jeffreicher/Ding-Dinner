import React, { Component } from 'react';
import Header from './header';
import Button from './button';
import Next from './next_button';
import newFilter from './new-filter-storage';
import '../assets/css/diet-selection.css';
import {Link} from 'react-router-dom';
import LogoHeader from './logo-header';


class DietSettings extends Component {   
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            value: false
        };

        this.handleSelected = this.handleSelected.bind(this);
    };
    
    handleSelected(buttonObject) {
        console.log("This is the thing", buttonObject);  
        const { selected } = this.state;

        if(!selected.includes(buttonObject.props.title)) {
            this.setState({
                selected: [buttonObject.props.title],
                value: true
            });
        }
        newFilter.diet = buttonObject.props.title;
        console.log(newFilter); 
    };

    render() {
        const { handleSelected } = this;
        console.log(this.state.selected);

        return (
            <div>
                <LogoHeader back={true} location={'/settings'}/>
                <div className="container">
                    <Header title={'What\'s Your Type?'}/>
                    <div className="center-align" style={{marginTop: `2vh`}}>
                        <Button title={'None'} descrip={'Send It'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('None')} />  
                        <Button title={'Ketogenic'} descrip={'Coachella Bod Meal Plan'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Ketogenic')} />     
                        <Button title={'Vegetarian'} descrip={'Lover Of Greens'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Vegetarian')} />   
                        <Button title={'Vegan'} descrip={'Veggie Fanatic'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Vegan')} />   
                        <Button title={'Pescatarian'} descrip={'Fish N\' Greens'} style={'button'} selectedCheck={ handleSelected } determineSelected={ this.state.selected.includes('Pescatarian')} />
                    </div>  
                    <div className="right" style={{marginTop: `3vh`}}>
                    {(this.state.value) ? <Link to='/allergy-settings'><Next /></Link> : console.log('error')}                   
                    </div>     
                </div>                
            </div>
        );  
    };
};

export default DietSettings;