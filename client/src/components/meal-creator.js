import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MealCreator extends Component {
    constructor(props){
        super(props);

        
    }
    render(){
        const {number, ingredients, instructions, imgSrc, mealName, deleteItem, onclick, completion} = this.props;
        return (
            <div className="mealsItem" onClick={()=>onclick(number, ingredients, instructions, mealName, imgSrc)} style={this.props.completion} >
                <img src={imgSrc} alt="" className="mealsImg" />
                <div className="mealsText">{mealName}</div>
                <div className="mealsCancel" onClick={(e)=>deleteItem(e, number)}>X</div>
            </div>
        )
    }
}

export default MealCreator;