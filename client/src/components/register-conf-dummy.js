import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <div>       
        <div>
            <h1>REGISTER CONF</h1>
        </div>
        <div className="right bottom"><Link to='/register'>
            <Next style={'bottom'}/>
            </Link>
        </div>   
</div>
);