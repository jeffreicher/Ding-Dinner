import React, {Component} from 'react';
import '../assets/css/reg-confirm.css'
import {Link} from 'react-router-dom';
import LogoHeader from './logo-header';

class RegisterConfirm extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div className='regConfirmContainer container'>
                <LogoHeader />
                <h3 className='center regConfirmHeader'>Confirm Choices</h3>
                <div className='regConfirmSelectionArea center'>
                    <div className='regConfirmLabel'>Email Address</div>
                    <div>Email here</div>
                    <div className='regConfirmLabel'>Diet Selection</div>
                    <div>Diet here</div>
                    <div className='regConfirmLabel'>Allergies</div>
                    <div>Allergy here</div>
                </div>
                <div className='regConfirmButtonContainer'>
                    <Link to='/'><button className='btn red darken-3'>Back to start</button></Link>
                    <Link to='/'><button className='btn green darken-1'>All set!</button></Link>
                </div>
                <div className='page-footer bottom blue darken-2 z-depth-1 regConfirmFooter'>
                </div>
            </div>
        )
    }
}

export default RegisterConfirm;