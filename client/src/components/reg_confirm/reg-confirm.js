import React, {Component} from 'react';
import axios from 'axios';
import registerstorage from '../info_storage/register-storage';
import '../../assets/css/reg-confirm.css'
import {Link} from 'react-router-dom';
import LogoHeader from '../general/logo-header';
import Footer from '../general/footer';

class RegisterConfirm extends Component {
    constructor(props) {
        super(props);

    };

    sendAcctToServer() {
        registerstorage.diet = registerstorage.diet.toLowerCase();
        for (let i=0; i<registerstorage.allergy.length; i++) {
            registerstorage.allergy[i] = registerstorage.allergy[i].toLowerCase();
        };
        axios({
            url: 'http://localhost:8080/C1.18_FoodTinder/endpoints/create_user.php',
            method: 'post',
            data: {
                    email: registerstorage.email,
                    password: registerstorage.password,
                    diet: registerstorage.diet,
                    allergies: registerstorage.allergy,
                },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then( resp => {
            console.log('We did it famalam', resp);
            if(resp.data.success === true) {
                this.props.history.push('/meal-number');
            };
        });
    };

    render() {
        return (
            <div className='regConfirmContainer container'>
                <LogoHeader />
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
                    <Link to='/' className='btn btn-large teal'>Back to start</Link>
                    <button className='btn btn-large orange darken-4' onClick={this.sendAcctToServer.bind(this)}>All set!</button>
                </div>
            </div>
        );
    };
};

export default RegisterConfirm;