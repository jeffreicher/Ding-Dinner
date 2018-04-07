import React from 'react';
import Next from './next_button';
import {Link} from 'react-router-dom';

export default () => (
    <div>       
        <div>
            <h1>REGISTER CONF</h1>
        </div>
        <div className="right bottom"><Link to='/'>
            <Next style={'bottom'}/>
            </Link>
        </div>   
    </div>
);