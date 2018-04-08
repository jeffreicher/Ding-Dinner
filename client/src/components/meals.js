import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Details from './details';
import mealdb from './meal-db';
import mealschosen from './meals-chosen';
import MealCreator from './meal-creator';

class Meals extends Component{
    constructor(props){
        super(props);

        this.state = {
            meals: mealschosen,
            showDetails: false,
            mealDetail: {
                name: '',
                image: '',
                ingredients: '',
                instructions: '',
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
        }
    }
    createMealElements(){
        console.log('hey');
    }
    mealClicked(number, ingredients, instructions, name, image){
        console.log(number);
        const newMealInfo = {
            name: name,
            image: image,
            ingredients: ingredients,
            instructions: instructions,
            index: number
        }
        this.setState({
            mealDetail: newMealInfo,
            showDetails: true
        });
    }
    hideDetails(){
        this.setState({
            showDetails: false
        });
    }
    removeMeal(event, index){
        event.stopPropagation();
        let {meals} = this.state;
        meals.splice(index, 1);
        this.setState({
            meals: meals
        })
        this.addSubstituteMeal();
    }
    completeMeal(index){
        let compMeals = [...this.state.completeMeals];
        compMeals[index] = {filter: 'grayscale(100%)'};
        this.setState({
            completeMeals: compMeals,
            showDetails: false
        });
    }
    addSubstituteMeal(){
        let randomIndex = Math.floor(Math.random() * mealdb.length);
        mealschosen.push(mealdb[randomIndex]);
        mealdb.splice(randomIndex, 1);
    }
    static contextTypes = {
        router: () => true
    }
    render(){

        const mealMap = this.state.meals.map((meal, index) => {
            return <MealCreator imgSrc={meal.imgSrc} mealName={meal.mealName} key={index} number={index} ingredients={meal.mealIngr} instructions={meal.mealInstr} onclick={this.mealClicked.bind(this)} deleteItem={this.removeMeal.bind(this)} completion={this.state.completeMeals[index]}/>
        });

        const {name, image, ingredients, instructions} = this.state.mealDetail;

        return(
            <div className="mealsContainer">
                <header className="mealsHeader">
                    <div className="mealsBack" onClick={this.context.router.history.goBack}><i className="fas fa-arrow-left iconcolor"></i></div>
                    <div className="mealsLogo lobsterFont">Ding</div>
                    <div className="mealsAdd"><Link to='/meal-number'><i className="far fa-plus-square"></i></Link></div>
                </header>
                <main className="mealsMainArea">
                    {mealMap}
                    {this.state.showDetails && <Details name={name} image={image} ingredients={ingredients} instructions={instructions} hide={this.hideDetails.bind(this)} complete={this.completeMeal.bind(this)} index={this.state.mealDetail.index} />}
                </main>
                <footer className="mealsFooter">
                    <div className="mealsMyMeals"><Link to='/mymeals'><i className="far fa-list-alt"></i></Link></div>
                    <div className="mealsGroceries"><Link to='/grocery'><i className="fas fa-shopping-cart"></i></Link></div>
                    <div className="mealsSettings"><Link to='/settings'><i className="fas fa-cogs"></i></Link></div>
                </footer>
            </div>
        )
    }
}

export default Meals;