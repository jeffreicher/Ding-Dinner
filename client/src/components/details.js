import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Details extends Component{
    constructor(props){
        super(props);

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
            }
        }
        this.headerClicked = this.headerClicked.bind(this);
    }
    headerClicked(target){
        let selectedSection= {};
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
                }
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
                break;
        }
        this.setState({
            ...selectedSection
        });
    }
    recipeComplete(){
      
    }
    render(){

        const {name, image, ingredients, instructions, hide, index, complete} = this.props;
        console.log(this.props);

        return(
            <div className="detailsContainer">
                <header className="detailsHeader">
                    <div className="detailsBack" onClick={hide}><i className="fas fa-arrow-left iconcolor"></i></div>
                    <div className="detailsLogo lobsterFont">Ding</div>
                    <div className="detailsAdd"></div>
                </header>
                <main className="detailsMainArea">
                    <img src={image} alt="" className="detailsImg" />
                    <h3 className='detailsName'>{name}</h3>
                    <h5 className='detailsTime'>Time Commitment: 30 minutes</h5>
                    <div className={"detailsIngredientsHead " + this.state.ingrTarget} onClick={()=>this.headerClicked('ingr')} >Ingredients</div>
                    <div className={"detailsInstructionsHead " + this.state.instrTarget} onClick={()=>this.headerClicked('instr')} >Instructions</div>
                    <div className={"detailsNutritionHead " + this.state.nutrTarget} onClick={()=>this.headerClicked('nutr')} >Nutrition</div>
                    <div className="detailsIngredientsList" style={this.state.ingrList}>
                        <ul>
                            <li>{ingredients}</li>
                        </ul>
                    </div>
                    <div className="detailsInstructionsList" style={this.state.instrList}>
                        <ul>
                            <li>{instructions}</li>
                        </ul>
                        <button className="btn green darken-1" onClick={()=>complete(index)}>Complete</button>
                    </div>
                    <div className="detailsNutritionList" style={this.state.nutrList}>
                        <ul>
                            <li>WIP please don't sue</li>
                        </ul>
                    </div>
                </main>
                <footer className="detailsFooter">
                    <div className="detailsMydetails" onClick={hide}><i className="far fa-list-alt"></i></div>
                    <div className="detailsGroceries"><Link to='/grocery'><i className="fas fa-shopping-cart"></i></Link></div>
                    <div className="detailsSettings"><Link to='/settings'><i className="fas fa-cogs"></i></Link></div>
                </footer>
            </div>
        )
    }
}

export default Details;