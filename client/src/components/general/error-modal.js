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
            justifyContent: 'center',            
            backgroundColor: '#f75211e7',            
            top: '47%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '38%',
            borderRadius: '50%',
            border: '2px solid white',
            color: 'white'
        };

        const closeMessage = {
            position: 'absolute',
            bottom: '0',
            fontSize: '1.5rem',
            paddingBottom: '12%',
            width: '100%',
            textShadow: '2px 3px 2px black',
            color: 'white'
        }

        const errorText = {
            marginBottom: '4vh',
            marginTop: '3vh',
            fontSize: '1.5rem',
            padding: '0 7%',
            color: 'white'
        }
        

        return (
            <div style={modalBackground} onClick={this.props.onClick} >
                <div className="center-align valign-wrapper" style={modalContent} >
                    <div><i className="material-icons" style={{fontSize: `3.5rem`}}>error_outline</i></div>
                    <div style={errorText}>{this.props.message}</div>                    
                </div>
                <div className="center-align" style={closeMessage}>Click anywhere to close</div>
            </div>
        );
    };
};

export default ErrorModal;