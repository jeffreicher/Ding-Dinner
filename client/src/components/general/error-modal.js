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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',            
            backgroundColor: '#f75211e7',            
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '23%',
            borderRadius: '5%'
        };


        return (
            <div style={modalBackground} onClick={this.props.onClick} >
                <div className="center-align valign-wrapper" style={modalContent} >
                    <h1 style={{marginBottom: `7vh`}}>{this.props.message}</h1>
                    <h6>Click anywhere to close</h6>
                </div>
            </div>
        );
    };
};

export default ErrorModal;