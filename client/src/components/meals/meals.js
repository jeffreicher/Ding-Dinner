import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import '../../assets/css/meals.css'
import Details from './details';
import mealdb from '../info_storage/meal-db';
import mealschosen from '../info_storage/meals-chosen';
import MealCreator from './meal-creator';
import MealConfirm from './mealconfirm';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';
import axios from 'axios';

class Meals extends Component {
    constructor(props) {
        super(props);

        this.retrieveUserMeals = this.retrieveUserMeals.bind(this);

        this.state = {
            meals: null,
            showDetails: false,
            confirmingMeals: false,
            mealDetail: {
                name: '',
                image: '',
                ingredients: '',
                recipe_id: '',
                index: ''
            },
            completeMeals: [
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'},
                {filter: 'grayscale(0%)'}
            ]
        };
    };

    determineMealConfirmation() {
        if (!this.props.location.state){
            this.setState({
                confirmingMeals: false
            }, () => {
                this.retrieveUserMeals();
            });
            return;
        }
        // const {confirmingMeals} = this.props.location.state;
        if (this.props.location.state.confirmingMeals === true){
            this.setState({
                confirmingMeals: true,
                meals: mealschosen
            }, () => {
                this.retrieveUserMeals();
            });
        } else {
            this.setState({
                confirmingMeals: false,
                meals: mealschosen
            }, () => {
                this.retrieveUserMeals();
            });
        }
    };

    componentWillMount() {
        this.determineMealConfirmation();
    };

    retrieveUserMeals(){
        if (!this.props.location.state){
            axios({
                // url: 'http://localhost:8080/frontend/Ding-FINAL/endpoints/loginMealGrab.php',
                // url: 'http://localhost:8888/dingLFZ/endpoints/loginMealGrab.php',
                url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/meals/userCurrentMeals.php',
                method: 'post',
                data: {
                    session_ID: localStorage.ding_sessionID
                }
                }).then((resp) => {
                console.log('Login meals works: ', resp);
                console.log('History: ',this.props.history);
                for (let i=0; i<resp.data.length; i++){
                    mealschosen.push(resp.data[i]);
                };
                this.setState({
                    meals: mealschosen
                });
            }).catch((err) => {
                console.log(err);
            });  
        };
    }

    closeMealConfirm() {
        const selectedMeals = [];
        for (var i=0; i<mealschosen.length; i++){
            selectedMeals.push(mealschosen[i].recipe_id);
        }
        axios({
            url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/create_meal_plan.php',
            method: 'post',
            data: {
                'recipe_ids': selectedMeals,
                'session_ID': localStorage.ding_sessionID
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( resp => {
            console.log('Confirming new meal plan: ', resp)
            this.setState({
                confirmingMeals: false
            })
        });
        
    };

    mealClicked(number, mealInfo) {
        console.log('Clicked meal: ', mealInfo);
        const mealDetail = {
            name: mealInfo.title,
            image: mealInfo.image,
            ingredients: '',
            recipe_id: mealInfo.recipe_id,
            readyInMinutes: mealInfo.readyInMinutes,
            index: number
        }
        const that = this;
        axios({
            url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/meals/recipeIngredients.php',
            method: 'post',
            data: {
                'recipe_id': mealInfo.recipe_id,
                'session_ID': localStorage.ding_sessionID
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( resp => {
            console.log('Ingr: ', resp);
            mealDetail.ingredients = resp.data;
            that.setState({
                showDetails: true,
                mealDetail: mealDetail
            });
        });
    };

    hideDetails(){
        this.setState({
            showDetails: false
        });
    };

    removeMeal(event, index){
        event.stopPropagation();
        if (mealdb.length === 0){
            this.addMealsToStorage(index);
            return;
        }
        let {meals} = this.state;
        meals.splice(index, 1);
        this.setState({
            meals: meals
        });
        this.addSubstituteMeal(index);
    };

    addMealsToStorage(index){
        axios({
            // url: 'http://localhost:8080/frontend/Ding-FINAL/endpoints/mealGen.php',
            // url: 'http://localhost:8888/dingLFZ/endpoints/mealGen.php',
            url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/meals/newRecipes.php',
            method: 'post',
            data: {
                session_ID: localStorage.ding_sessionID
            }
        }).then((resp) => {
            console.log('Meal gen response: ', resp);
            for (var i=0; i<resp.data.length; i++){
                mealdb.push(resp.data[i]);
            }
            let {meals} = this.state;
            meals.splice(index, 1);
            this.setState({
                meals: meals
            }), () => {
                this.addSubstituteMeal(index);
            };
        }).catch((err) => {
            console.log('Meal gen error: ', err);
        });
    }

    completeMeal(index, recipe_id) {
        axios({
            url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/update_meal_completed.php',
            method: 'post',
            data: {
                'recipe_id': recipe_id,
                'session_ID': localStorage.ding_sessionID,
                completed: 1
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( resp => {
            console.log('Complete meal: ', resp);
            this.setState({
                showDetails: false,
            });
            //window.location.reload();
            this.reloadMeals();
        });
    };

    reloadMeals(){
        while(mealschosen.length){
            mealschosen.pop();
        }
        this.retrieveUserMeals();
    }

    addSubstituteMeal(index) {
        let randomIndex = Math.floor(Math.random() * mealdb.length);
        mealschosen.splice(index, 0, (mealdb[randomIndex]));
        mealdb.splice(randomIndex, 1);
        this.setState({
            meals: mealschosen
        })
    };

    render() {

        let mealMap = '';

        this.state.meals ? mealMap = this.state.meals.map((meal, index) => {return <MealCreator mealInfo={meal} key={index} number={index} onclick={this.mealClicked.bind(this)} deleteItem={this.removeMeal.bind(this)} completion={this.state.completeMeals[index]} deleteable={this.state.confirmingMeals}/>}) : '';
        
        const {mealDetail} = this.state;

        return(
            <div className="mealsContainer">
                <LogoHeader add={true}/>
                <main className="mealsMainArea">
                    {mealMap}
                    {this.state.confirmingMeals && <MealConfirm confirming={this.state.confirmingMeals} closeconfirm={this.closeMealConfirm.bind(this)} />}
                    {this.state.showDetails && <Details mealInfo={mealDetail} hide={this.hideDetails.bind(this)} complete={this.completeMeal.bind(this)} index={this.state.mealDetail.index} hidecomplete={this.state.confirmingMeals} />}
                </main>
                <Footer currentPage='meals'/>
            </div>
        );
    };
};

export default Meals;