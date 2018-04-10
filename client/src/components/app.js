import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import '../assets/css/app.css';
import Login from './login';
import Meals from './meals';
import Details from './details';
import Grocery from './grocery';
import Settings from './settings';
import DietSelection from './diet-selection';
import AllergySelection from './allergy-selection';
import DietSettings from './diet-settings';
import AllergySettings from './allergy-settings';
import MealNumber from './meal_number';
import MealNumberSettings from './meal-num-settings';
import RegisterConfirm from './reg-confirm';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class App extends Component{
    constructor(props){
        super(props);


    }
    render(){
        return (
            <Router>
                <div className='containerThing container'>
                    <div className='hide-on-small-only phonePls valign-wrapper'><div>This content best viewed on mobile</div></div>
                    <Route exact path='/' component={Login} />
                    <Route path='/mymeals' component={Meals} />
                    <Route path='/details' component={Details} />
                    <Route path='/grocery' component={Grocery} />
                    <Route path='/settings' component={Settings} />
                    <Route path="/diet-selection" component={DietSelection} />
                    <Route path="/allergy-selection" component={AllergySelection} />
                    <Route path="/meal-number" component={MealNumber} />
                    <Route path="/diet-settings" component={DietSettings} />
                    <Route path="/allergy-settings" component={AllergySettings} />
                    <Route path="/meal-num-settings" component={MealNumberSettings} />
                    <Route path='/register-confirm' component={RegisterConfirm} />
                </div>
            </Router>
        );
    }
}


export default App;
