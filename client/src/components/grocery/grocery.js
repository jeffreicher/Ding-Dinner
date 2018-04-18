import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';
import grocerystorage from '../info_storage/grocery-storage';
import Settings from '../settings/settings';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';
import Loader from '../general/loader';
import '../../assets/css/grocery.css';
import ModalError from '../general/error-modal';

class Grocery extends Component {
    constructor(props) {
        super(props);

        this.renderGroceryList = this.renderGroceryList.bind(this);

        this.state = {
                listOfIngredients: [],
                showLoader: false,
                modalStatus: false,
                message: ""
        };
    };

    componentDidMount() {
        this.setState({
            showLoader: true
        });

        axios({
            // url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/meals/allMealsIngredients.php',
            url: 'http://localhost:8080/frontend/Ding-FINAL/endpoints/meals/allMealsIngredients.php',
            method: 'post',
            data: {
                'session_ID': localStorage.ding_sessionID
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( resp => {
            this.renderGroceryList(resp);
            if (typeof resp.data === undefined) {
                this.setState({
                    modalStatus: true,
                    message: "Server Error. Please try again later."
                });
            };
        });
    };

    renderGroceryList(resp) {
        const {ounces, teaspoons, misc} = resp.data;

        const ounceKeys = Object.keys(ounces);
        const teaspoonKeys = Object.keys(teaspoons);
        const miscKeys = Object.keys(misc);

        while(grocerystorage.length){
            grocerystorage.pop();
        }

        for (let i=0; i< ounceKeys.length; i++){
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
            listOfIngredients: grocerystorage,
            showLoader: false
        });
    };
    
    render() {

        console.log(this.state.listOfIngredients);

        const listMap = (this.state.listOfIngredients).map((item, index) => {
            return (
                <div className='item' key={index} >
                    <input type='checkbox' className='check filled-in' id={index} />
                    <label className='name oxygenFont' htmlFor={index}>{item}</label>
                </div>
            );
		});

        return (
            <div className="groceryContainer Oxygen">
                {this.state.showLoader && <Loader />}
                <LogoHeader style={{position: 'fixed'}}/>
                <main className="mainArea" >
                        <h4 className="head card-panel lobsterFont z-depth-2 grey darken-2"> List</h4>
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