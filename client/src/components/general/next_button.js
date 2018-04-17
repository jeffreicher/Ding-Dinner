import React from 'react';

const buttonStyle = {
    boxShadow: '6px 6px 4px 0 rgba(255, 255, 255, 0.14), 0 1px 10px 0 rgba(255, 255, 255, 0.12), 0 2px 4px -1px rgba(255, 255, 255, .5)'
}

export default (props) => (
    <div className="container">
        <button onClick={props.onclick} style={buttonStyle} className={`waves-effect waves-light btn-large oxygenFont z-depth-2 orange darken-4 ${props.style}`}>{props.name || 'Next'}</button>
    </div>
);