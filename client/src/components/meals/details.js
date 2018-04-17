import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Footer from '../general/footer';
import LogoHeader from '../general/logo-header';

class Details extends Component {
    constructor(props) {
        super(props);
        
        this.headerClicked = this.headerClicked.bind(this);
        this.generateIngredients = this.generateIngredients.bind(this);
        this.generateInstructions = this.generateInstructions.bind(this);
        this.generateNutrition = this.generateNutrition.bind(this);

        this.state = {
            recipeComplete: false,
            ingrTarget: 'detailsSelectedList',
            instrTarget: '',
            nutrTarget: '',
            ingrList: {
                display: 'inline'
            },
            instrList: {
                display: 'none'
            },
            nutrList: {
                display: 'none'
            },
            ingrInfo: '',
            instrInfo: '',
            nutrInfo: ''
        };        
    };

    componentWillMount(){
        console.log('Detail side mounting: ', this.props.mealInfo);
        this.generateIngredients(this.props.mealInfo.ingredients);
    }

    headerClicked(target) {
        let selectedSection= {};
        let axiosTarget = '';
        switch (target){
            case 'ingr':
                selectedSection = {
                    ingrTarget: 'detailsSelectedList',
                    instrTarget: '',
                    nutrTarget: '',
                    ingrList: {
                        display: 'inline'
                    },
                    instrList: {
                        display: 'none'
                    },
                    nutrList: {
                        display: 'none'
                    }
                };
                axiosTarget = 'recipeIngredients';
                break;
            case 'instr':
                selectedSection = {
                    ingrTarget: '',
                    instrTarget: 'detailsSelectedList',
                    nutrTarget: '',
                    ingrList: {
                        display: 'none'
                    },
                    instrList: {
                        display: 'inline'
                    },
                    nutrList: {
                        display: 'none'
                    }
                };
                axiosTarget = 'recipeInstructions';
                break;
            case 'nutr':
                selectedSection = {
                    ingrTarget: '',
                    instrTarget: '',
                    nutrTarget: 'detailsSelectedList',
                    ingrList: {
                        display: 'none'
                    },
                    instrList: {
                        display: 'none'
                    },
                    nutrList: {
                        display: 'inline'
                    }
                };
                axiosTarget = 'recipeNutrition';
                break;
        };
        axios({
            url: `http://localhost:8080/C1.18_FoodTinder/endpoints/meals/${axiosTarget}.php`,
            method: 'post',
            data: {
                'recipe_id': this.props.mealInfo.recipe_id,
                'session_ID': localStorage.ding_sessionID
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( resp => {
            console.log('Details list area: ', resp);
            if (axiosTarget === 'recipeIngredients'){
                this.generateIngredients(resp, selectedSection);
            } else if (axiosTarget === 'recipeInstructions'){
                this.generateInstructions(resp, selectedSection);
            } else if (axiosTarget === 'recipeNutrition'){
                this.generateNutrition(resp, selectedSection);
            };
        });
    };

    generateIngredients(info, selectedSection){
        this.setState({
            ingrInfo: info.data,
            ...selectedSection
        });
    }

    generateInstructions(info, selectedSection){
        console.log(info.data);
        this.setState({
            instrInfo: info.data,
            ...selectedSection
        });
    }

    generateNutrition(info, selectedSection){
        this.setState({
            nutrInfo: info.data[0],
            ...selectedSection
        });
    }

    render() {

        console.log('Detail props: ', this.props);

        const {mealInfo, hide, index, complete} = this.props;

        console.log('Meal info is: ', mealInfo.ingredients);

        let instrMap = '';
        
        this.state.instrInfo !== '' ? instrMap = this.state.instrInfo.map((item, index) => {return <li className='collection-item detailsListItem' key={index}>{index+1}. {item.step}</li>}) : instrMap = '';

        let ingrMap = '';

        this.state.ingrInfo !== '' ? ingrMap = mealInfo.ingredients.map((item, index) => {return <li className='collection-item detailsListItem' key={index}>{`${mealInfo.ingredients[index].amount} ${mealInfo.ingredients[index].unit_type} ${mealInfo.ingredients[index].ingredient}`}</li>}) : ingrMap = '';
        
        let nutrMap = '';

        this.state.nutrInfo !== '' ? nutrMap = 
        <ul className='collection'>
            <li className='collection-item detailsListItem'>Calories: {this.state.nutrInfo.calories}</li>
            <li className='collection-item detailsListItem'>Protein: {this.state.nutrInfo.protein}</li>
            <li className='collection-item detailsListItem'>Sugar: {this.state.nutrInfo.sugar}</li>
            <li className='collection-item detailsListItem'>Carbohydrates: {this.state.nutrInfo.carbs}</li>
            <li className='collection-item detailsListItem'>Fat: {this.state.nutrInfo.fat}</li>
            <li className='collection-item detailsListItem'>Sodium: {this.state.nutrInfo.sodium}</li>
        </ul>
        :
        nutrMap = '';

        return(
            <div className="detailsContainer">
                <LogoHeader onClick={hide} back={true} style={{position: 'fixed'}}/>
                <main className="detailsMainArea">
                    <img src={mealInfo.image} alt="" className="detailsImg" />
                    <h3 className='detailsName'>{mealInfo.name}</h3>
                    <h5 className='detailsTime'>Time to Complete: {mealInfo.readyInMinutes} minutes</h5>
                    <div className={"detailsIngredientsHead " + this.state.ingrTarget} onClick={()=>this.headerClicked('ingr')} >Ingredients</div>
                    <div className={"detailsInstructionsHead " + this.state.instrTarget} onClick={()=>this.headerClicked('instr')} >Instructions</div>
                    <div className={"detailsNutritionHead " + this.state.nutrTarget} onClick={()=>this.headerClicked('nutr')} >Nutrition</div>
                    <div className="detailsIngredientsList" style={this.state.ingrList}>
                        <ul className='collection'>
                            {ingrMap}
                        </ul>
                    </div>
                    <div className="detailsInstructionsList" style={this.state.instrList}>
                        <ul className='collection'>
                            {instrMap}
                        </ul>
                        {!this.props.hidecomplete && <button className="completeButton btn green darken-2" onClick={()=>complete(index, mealInfo.recipe_id)}>Complete</button>}
                    </div>
                    <div className="detailsNutritionList" style={this.state.nutrList}>
                        {nutrMap}
                    </div>
                </main>
                <Footer currentPage='meals' />
            </div>
        );
    };
};

export default Details;