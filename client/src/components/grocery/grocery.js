import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';
import grocerystorage from '../info_storage/grocery-storage';
import Settings from '../settings/settings';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';
import '../../assets/css/grocery.css';

class Grocery extends Component {
    constructor(props) {
        super(props);

        this.renderGroceryList = this.renderGroceryList.bind(this);

        this.state = {
                listOfIngredients: []
        };
    };

    componentDidMount() {
        axios({
                url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/meals/allMealsIngredients.php',
                method: 'post',
                data: {
                    'session_ID': localStorage.ding_sessionID
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then( resp => {
                this.renderGroceryList(resp);
            });
    };

    renderGroceryList(resp) {
        const {ounces, teaspoons, misc} = resp.data;

        const ounceKeys = Object.keys(ounces);
        const teaspoonKeys = Object.keys(teaspoons);
        const miscKeys = Object.keys(misc);

        for (let i=0; i < ounceKeys.length; i++) {
            const key = ounceKeys[i];
            grocerystorage.push(`${ounces[key]} ${key}`);
        };

        for (let i=0; i < teaspoonKeys.length; i++) {
            const key = teaspoonKeys[i];
            grocerystorage.push(`${teaspoons[key]} ${key}`);
        };
        
        for (let i=0; i < miscKeys.length; i++) {
            const key = miscKeys[i];
            grocerystorage.push(`${misc[key]} ${key}`);
        };

        this.setState({
            listOfIngredients: grocerystorage
        });
    };
    
    render() {

        console.log(this.state.listOfIngredients);

        const listMap = (this.state.listOfIngredients).map((item, index) => {
            return (
                <div className='item'>
                    <input type='checkbox' className='check filled-in' id={index} key={index} />
                    <label className='name oxygenFont' htmlFor={index}>{item}</label>
                </div>
            );
		});

        return (
            <div className="groceryContainer Oxygen">
                <LogoHeader style={{position: 'fixed'}}/>
                <main className="mainArea" >
                        <h4 className="head card-panel lobsterFont z-depth-2">List</h4>
                        <div className="list">
                            {listMap}
                        </div>
                </main>
                <Footer currentPage='grocery' />
            </div>
        );
    };
};

export default Grocery;