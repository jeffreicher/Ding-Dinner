import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import Settings from './settings';

class Grocery extends Component{
    constructor(props){
        super(props);


    }
    render(){
        return (
            <div className="groceryContainer">
            <header className="groceryHeader">
                    <div className="groceryBack"><Link to='/mymeals'>Back</Link></div>
                    <div className="groceryLogo">Ding</div>
                    <div className="groceryAdd"></div>
            </header>
            <main className="groceryMainArea">
                    <h1 className="groceryHead">Grocery List</h1>
                    <div className="groceryList">
                    <h3 className="grocerySection">Beans</h3>
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
                    <h3 className="grocerySection">More Beans</h3>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <div className="groceryItem">
                            <input type='checkbox' className='groceryCheck' />
                            <label className='groceryName'>14oz beans</label>
                    </div>
                    <h3 className="grocerySection">Dessert Beans</h3>
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
            <footer className="groceryFooter">
                    <div className="groceryMygrocery"><Link to='/mymeals'>Meals</Link></div>
                    <div className="groceryGroceries">Groceries</div>
                    <div className="grocerySettings"><Link to='/settings'>Settings</Link></div>
            </footer>
            </div>
        )
    }
}

export default Grocery;