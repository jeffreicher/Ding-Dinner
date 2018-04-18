import React, { Component } from 'react';

class ErrorModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const modalBackground = {
            position: 'absolute',
            backgroundColor: 'rgb(128, 128, 128, 0.8)',
            top: '0',
            zIndex: '100',
            height: '100vh',
            width: '100vw'
        };

        const modalContent = {
            position: 'absolute',
            backgroundColor: 'rgb(128, 128, 128, 0.8)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '30%'
        };


        return (
            <div style={modalBackground} >
                <div className="center-align valign-wrapper" style={modalContent} >
                    <h1 style={{width: `100%`}}>{this.props.message}</h1>
                </div>
            </div>
        );
    };
};

export default ErrorModal;