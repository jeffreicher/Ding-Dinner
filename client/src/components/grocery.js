import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import Settings from './settings';
import LogoHeader from './logo-header';
import Footer from './footer';

class Grocery extends Component{
    constructor(props){
        super(props);

    }
    
    render(){
        return (
            <div className="groceryContainer Oxygen">
            <LogoHeader back={true} />
            <main className="groceryMainArea">
                <h4 className="groceryHead card-panel lobsterFont z-depth-2">Grocery List</h4>
                <div className="groceryList">
                <h4 className="grocerySection lobsterFont">Beans</h4>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName oxygenFont'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName oxygenFont'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName oxygenFont'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName oxygenFont'>14oz beans</label>
                </div>
                <h3 className="grocerySection lobsterFont">More Beans</h3>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <h3 className="grocerySection lobsterFont">Dessert Beans</h3>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <h3 className="grocerySection">More Beans So It Scrolls</h3>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                <div className="groceryItem">
                        <input type='checkbox' className='groceryCheck' />
                        <label className='groceryName'>14oz beans</label>
                </div>
                </div>
            </main>
            <Footer />
            </div>
        );
    };
};

export default Grocery;