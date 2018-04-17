import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';
import grocerystorage from '../info_storage/grocery-storage';
import Settings from '../settings/settings';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';
import '../../assets/css/grocery.css';

class Grocery extends Component {
    constructor(props){
        super(props);

        this.renderGroceryList = this.renderGroceryList.bind(this);

        this.state = {
                listOfIngredients: []
        }
    };

    componentDidMount(){
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
    }

    renderGroceryList(resp){
        // ounces teaspoons misc
        // const resultingArrayFromMap = Object.keys(someObj).map((key, index) => {
		// 	console.group('Loop Output:');
		// 	console.log('Key:', key);
		// 	console.log('Value:', someObj[key]);
		// 	console.groupEnd();
                // });
        const {ounces, teaspoons, misc} = resp.data;

        const ounceKeys = Object.keys(ounces);
        const teaspoonKeys = Object.keys(teaspoons);
        const miscKeys = Object.keys(misc);

        for (let i=0; i< ounceKeys.length; i++){
            const key = ounceKeys[i];
            grocerystorage.push(`${ounces[key]} ${key}`);
        }

        for (let i=0; i< teaspoonKeys.length; i++){
            const key = teaspoonKeys[i];
            grocerystorage.push(`${teaspoons[key]} ${key}`);
        }
        
        for (let i=0; i< miscKeys.length; i++){
            const key = miscKeys[i];
            grocerystorage.push(`${misc[key]} ${key}`);
        }

        this.setState({
            listOfIngredients: grocerystorage
        })

		// const ouncesMap = Object.keys(resp.data.teaspoons).map((key, index) => {
		// 	<div className='item'>
		// 		<input type='checkbox' className='check filled-in' id={`ounces${index}`} key={index} />
		// 		<label className='name oxygenFont' htmlFor={`ounces${index}`}>{resp.data.ounces[key]} {key}</label>
        //     </div>
        //     console.log('Item key: ',key);
        //     console.log('Item value: ',resp.data.teaspoons[key]);
		// });
		// this.setState({
		// 	ouncesRender: ouncesMap
		// });
    }
    
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
                        <h4 className="head card-panel lobsterFont z-depth-2"> List</h4>
                        <div className="list">
							{listMap}
                                {/* <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item1' />
                                        <label className='name oxygenFont' htmlFor='item1'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item2' />
                                        <label className='name oxygenFont' htmlFor='item2'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item3' />
                                        <label className='name oxygenFont' htmlFor='item3'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item4' />
                                        <label className='name oxygenFont' htmlFor='item4'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item5' />
                                        <label className='name oxygenFont' htmlFor='item5'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item6' />
                                        <label className='name oxygenFont' htmlFor='item6'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item7' />
                                        <label className='name oxygenFont' htmlFor='item7'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item8' />
                                        <label className='name oxygenFont' htmlFor='item8'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item9' />
                                        <label className='name oxygenFont' htmlFor='item9'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item10' />
                                        <label className='name oxygenFont' htmlFor='item10'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item11' />
                                        <label className='name oxygenFont' htmlFor='item11'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item12' />
                                        <label className='name oxygenFont' htmlFor='item12'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item13' />
                                        <label className='name oxygenFont' htmlFor='item13'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item14' />
                                        <label className='name oxygenFont' htmlFor='item14'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item15' />
                                        <label className='name oxygenFont' htmlFor='item15'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item16' />
                                        <label className='name oxygenFont' htmlFor='item16'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item17' />
                                        <label className='name oxygenFont' htmlFor='item17'>14oz beans</label>
                                </div>
                                <div className="item">
                                        <input type='checkbox' className='check filled-in' id='item18' />
                                        <label className='name oxygenFont' htmlFor='item18'>14oz beans</label>
                                </div> */}
                        </div>
                </main>
                <Footer currentPage='grocery' />
            </div>
        );
    };
};

export default Grocery;