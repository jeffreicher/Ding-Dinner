import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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

        this.state = {
            meals: mealschosen,
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
            });
            return;
        }
        const {confirmingMeals} = this.props.location.state;
        this.setState({
            confirmingMeals: confirmingMeals
        });
    };

    componentWillMount() {
        this.determineMealConfirmation();
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
            console.log('All Meal Ingrs: ', resp)
        });
    };

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
        });
        this.setState({
            confirmingMeals: false
        });
    };

    mealClicked(number, mealInfo) {
        console.log('Clicked meal: ', mealInfo);
        const mealDetail = {
            name: mealInfo.title,
            image: mealInfo.image,
            ingredients: '',
            recipe_id: mealInfo.recipe_id,
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
        let {meals} = this.state;
        meals.splice(index, 1);
        this.setState({
            meals: meals
        })
        this.addSubstituteMeal();
    };

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
        })
        let compMeals = [...this.state.completeMeals];
        compMeals[index] = {filter: 'grayscale(100%)'};
        this.setState({
            completeMeals: compMeals,
            showDetails: false
        });
    };

    addSubstituteMeal() {
        let randomIndex = Math.floor(Math.random() * mealdb.length);
        mealschosen.push(mealdb[randomIndex]);
        mealdb.splice(randomIndex, 1);
    };

    render() {

        const mealMap = this.state.meals.map((meal, index) => {
            return <MealCreator mealInfo={meal} key={index} number={index} onclick={this.mealClicked.bind(this)} deleteItem={this.removeMeal.bind(this)} completion={this.state.completeMeals[index]} deleteable={this.state.confirmingMeals}/>
        });

        const {mealDetail} = this.state;


        return(
            <div className="mealsContainer">
                <LogoHeader add={true}/>
                <main className="mealsMainArea">
                    {this.state.confirmingMeals && <MealConfirm confirming={this.state.confirmingMeals} closeconfirm={this.closeMealConfirm.bind(this)} />}
                    {mealMap}
                    {this.state.showDetails && <Details mealInfo={mealDetail} hide={this.hideDetails.bind(this)} complete={this.completeMeal.bind(this)} index={this.state.mealDetail.index} hidecomplete={this.state.confirmingMeals} />}
                </main>
                <Footer currentPage='meals'/>
            </div>
        );
    };
};

export default Meals;