import React, {Component} from 'react';
import registerstorage from '../info_storage/register-storage';
import '../../assets/css/reg-confirm.css'
import {Link} from 'react-router-dom';
import LogoHeader from '../general/logo-header';

class RegisterConfirm extends Component{
    constructor(props){
        super(props);

    }
    sendAcctToServer(){
        axios({
            url: 'http://localhost:80/c1.18_FoodTinder/endpoints/create_user.php',
            method: 'post',
            data: {
                    email: 'jeff@jeff.jeff',
                    password: 'jeffrocks',
                    diet: 'none',
                    allergies: ['peanut', 'wheat', 'rocks']
                },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((resp)=>{
            console.log('We did it famalam', resp);
        });
    }

    render(){
        return (
            <div className='regConfirmContainer container'>
                <div className='nav-wrapper blue darken-2 z-depth-1'>
                    <div className='brand-logo center white-text'>Ding</div>
                </div>
                <h3 className='center regConfirmHeader'>Confirm Choices</h3>
                <div className='regConfirmSelectionArea center'>
                    <div className='regConfirmLabel'>Email Address</div>
                    <div>{registerstorage.email}</div>
                    <div className='regConfirmLabel'>Diet Selection</div>
                    <div>{registerstorage.diet}</div>
                    <div className='regConfirmLabel'>Allergies</div>
                    <div>{registerstorage.allergy.join(', ') || 'None'}</div>
                </div>
                <div className='regConfirmButtonContainer'>
                    <Link to='/' className='btn red darken-2'>Back to start</Link>
                    <Link to='/meal-number' className='btn blue darken-2' onClick={this.sendAcctToServer.bind(this)}>All set!</Link>
                </div>
                <div className='page-footer bottom blue darken-2 z-depth-1 regConfirmFooter'>
                </div>
            </div>
        )
    }
}

export default RegisterConfirm;