import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LoginHide extends Component{
    constructor(props){
        super(props);

        this.fieldFocused = this.fieldFocused.bind(this);
        this.fieldBlurred = this.fieldBlurred.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            dataValue: '',
            emailValue: '',
            passwordValue: '',
            emailFocused: false,
            passwordFocused: false,
            emailColor: {
                color: 'black'
            },
            passwordColor: {
                color: 'black'
            }
        }
    }
    emailChange(e){
        const emailValidification = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.setState({
            emailValue: e.target.value
        }, () => {
            if(emailValidification.test(this.state.emailValue)){
                const greenText = {textDecoration: 'line-through'};
                this.setState({
                    emailColor: greenText
                });
            } else {
                const blackText = {textDecoration: 'none'};
                this.setState({
                    emailColor: blackText
                });
            }
        });
    }
    passwordChange(e){
        this.setState({
            passwordValue: e.target.value
        }, () => {
            if(this.state.passwordValue.length >= 8){
                const greenText = {textDecoration: 'line-through'};
                this.setState({
                    passwordColor: greenText
                });
            } else {
                const blackText = {textDecoration: 'none'};
                this.setState({
                    passwordColor: blackText
                });
            }
        });
    }
    goBack(e){
        e.preventDefault();
        if(this.state.emailValue.length === 0 || this.state.passwordValue.length === 0){
            alert('put stuff in the dang fields');
            return;
        }
        this.props.returnFX();
    }
    fieldFocused(targetField){
        if (targetField === 'email'){
            this.setState({
                emailFocused: true
            });
        } else if (targetField === 'password'){
            this.setState({
                passwordFocused: true
            });
        }
    }
    fieldBlurred(targetField){
        if (targetField === 'email'){
            this.setState({
                emailFocused: false
            });
        } else if (targetField === 'password'){
            this.setState({
                passwordFocused: false
            });
        }
    }
    render(){
        const greenText = {textDecoration: 'line-through'}
        return (
            <form onSubmit={this.goBack} className='row'>
                <div className='col s8 offset-s2 inputField'>
                    <label className='white-text'>Email</label>
                    <input type='text' className='white-text' value={this.state.emailValue} onChange={this.emailChange} onFocus={()=>this.fieldFocused('email')} onBlur={()=>this.fieldBlurred('email')}/>
                    {this.state.emailFocused && <div style={this.state.emailColor} className='validationText1'>{this.state.emailColor.textDecoration === 'line-through' && <div className='checkmark'>✓</div>}Must be valid email address</div>}
                </div>
                <div className='col s2' />
                <div className='col s8 offset-s2'>
                    <label className='white-text'>Password</label>
                    <input type='password' className='white-text' value={this.state.passwordValue} onChange={this.passwordChange} onFocus={()=>this.fieldFocused('password')} onBlur={()=>this.fieldBlurred('password')}/>
                    {this.state.passwordFocused && <div style={this.state.passwordColor} className='validationText'>{this.state.passwordColor.textDecoration === 'line-through' && <div className='checkmark'>✓</div>}Must be at least 8 characters long</div>}
                </div>
                <div className='col s2' />
                {(this.state.dataValue) ? <Link to='/mymeals' className='btn center-align'>Submit</Link> : <Link to='/meal-number' className='btn center-align'>Submit</Link>}
            </form>
        );
    }
}

export default LoginHide;