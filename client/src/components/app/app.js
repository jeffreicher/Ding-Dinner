import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import '../../assets/css/app.css';
import Login from '../login/login';
import Meals from '../meals/meals';
import Details from '../meals/details';
import Grocery from '../grocery/grocery';
import Settings from '../settings/settings';
import DietSelection from '../diet/diet-selection';
import AllergySelection from '../allergy/allergy-selection';
import DietSettings from '../settings/diet-settings';
import AllergySettings from '../settings/allergy-settings';
import MealNumber from '../meal_num/meal_number';
import MealNumberSettings from '../settings/meal-num-settings';
import RegisterConfirm from '../reg_confirm/reg-confirm';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleScroll = this.toggleScroll.bind(this);
        
        this.state = {
            scrollStyle: 'visible'
        }
    };

    toggleScroll(){
        if(this.state.scrollStyle === 'visibile'){
            this.setState({
                scrollStyle: 'hidden'
            });
        } else {
            this.setState({
                scrollStyle: 'visible'
            });
        }
    }

    render() {

        const MyMealsPage = (props) => {
            return (
              <Meals 
                toggleScroll={this.toggleScroll.bind(this)}
                {...props}
              />
            );
          }

        return (
            <Router>
                <div className='mainContentContainer' style={{overflowY: this.state.scrollStyle}}>
                    <div className='desktop-gutter gutter-left'></div>
                    <Route exact path='/' component={Login} />
                    <Route path='/mymeals' component={MyMealsPage} />
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
                    <div className='desktop-gutter gutter-right'></div>                    
                </div>
            </Router>
        );
    };
};


export default App;
