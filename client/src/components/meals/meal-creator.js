import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MealCreator extends Component {
    constructor(props) {
        super(props);
        
    };

    render() {
        const {mealInfo, number, deleteItem, onclick} = this.props;

        let completeStyle = '';

        this.props.mealInfo.completed ?  completeStyle = {'filter': 'grayscale(100%)'} :  completeStyle = {'filter': 'grayscale(0%)'};

        const bgImage = {backgroundImage: 'url('+mealInfo.image+')'};

        return (
            <div className="mealsItem" onClick={()=>onclick(number, mealInfo)} style={bgImage} >
                {/* <img src={mealInfo.image} alt="" className="mealsImg" /> */}
                <div className="mealsText oxygenFont">{mealInfo.title}</div>
                {this.props.deleteable && <div className="mealsCancel" onClick={(e)=>deleteItem(e, number)}><i className="fas fa-trash-alt"></i></div>}
            </div>
        );
    };
};

export default MealCreator;