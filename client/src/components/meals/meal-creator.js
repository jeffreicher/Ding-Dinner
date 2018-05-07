import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MealCreator extends Component {
    constructor(props) {
        super(props);
        
    };

    render() {
        const {mealInfo, number, deleteItem, onclick, style} = this.props;
        
        let completeStyle = '';

        this.props.mealInfo.complete ?  completeStyle = 'mealCompleteGrey' :  completeStyle = 'mealIncomplete';

        const bgImage = {backgroundImage: 'url('+mealInfo.image+')'};

        return (
            <div className={`mealsItem ${completeStyle} ${style}`} onClick={()=>onclick(number, mealInfo)} style={bgImage}  >
                <div className='mealsShadowArea'>
                    <div className="mealsText oxygenFont left-align">{mealInfo.title}</div>
                    {this.props.deleteable && <div className="mealsCancel" onClick={(e)=>deleteItem(e, number)}><i className="fas fa-sync-alt"></i></div>}
                </div>
            </div>
        );
    };
};

export default MealCreator;