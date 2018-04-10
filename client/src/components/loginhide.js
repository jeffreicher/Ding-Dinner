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
                const greenText = {color: 'green'};
                this.setState({
                    emailColor: greenText
                });
            } else {
                const blackText = {color: 'black'};
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
                const greenText = {color: 'green'};
                this.setState({
                    passwordColor: greenText
                });
            } else {
                const blackText = {color: 'black'};
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
        const greenText = {color: 'green'}
        return (
            <form onSubmit={this.goBack}>
                <div>
                    <label>Email</label>
                    <input type='text' className='loginField' value={this.state.emailValue} onChange={this.emailChange} onFocus={()=>this.fieldFocused('email')} onBlur={()=>this.fieldBlurred('email')}/>
                    {this.state.emailFocused && <div style={this.state.emailColor} className='validationText'>{this.state.emailColor.color === 'green' && <div className='checkmark'>✓</div>}Must be valid email address</div>}
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' className='loginField' value={this.state.passwordValue} onChange={this.passwordChange} onFocus={()=>this.fieldFocused('password')} onBlur={()=>this.fieldBlurred('password')}/>
                    {this.state.passwordFocused && <div style={this.state.passwordColor} className='validationText'>{this.state.passwordColor.color === 'green' && <div className='checkmark'>✓</div>}Must be at least 8 characters long</div>}
                </div>
        <button>{(this.state.dataValue) ? <Link to='/mymeals'>Submit</Link> : <Link to='/meal-number'>Submit</Link>}</button>
            </form>
        );
    }
}

export default LoginHide;