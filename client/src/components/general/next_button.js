import React from 'react';

export default (props) => (
    <div className="container">
        <button onClick={props.onclick} className={`waves-effect waves-light btn-large oxygenFont z-depth-2 orange darken-4 ${props.style}`}>{props.name || 'Next'}</button>
    </div>
);