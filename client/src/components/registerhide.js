import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class RegisterHide extends Component{
    constructor(props){
        super(props);

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.confirmChange = this.confirmChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            emailValue: '',
            passwordValue: '',
            confirmValue: ''
        }
    }
    goBack(e){
        e.preventDefault();
        if(this.state.emailValue.length === 0 || this.state.passwordValue.length === 0 || this.state.confirmValue.length === 0){
            alert('put stuff in the dang fields');
            return;
        } else if (this.state.passwordValue.length !== this.state.confirmValue.length){
            alert('match yer daggum passwords')
            return;
        }
        this.props.returnFX();
    }
    emailChange(e){
        this.setState({
            emailValue: e.target.value
        })
    }
    passwordChange(e){
        this.setState({
            passwordValue: e.target.value
        })
    }
    confirmChange(e){
        this.setState({
            confirmValue: e.target.value
        })
    }
    render(){
        return (
            <form onSubmit={this.goBack}>
                <div>
                    <label>Email</label>
                    <input type='text' value={this.state.emailValue} onChange={this.emailChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type='password' value={this.state.passwordValue} onChange={this.passwordChange}/>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type='password' value={this.state.confirmValue} onChange={this.confirmChange}/>
                </div>
                <button><Link to='/diet-selection'>Submit</Link></button>
            </form>
        );
    }
}

export default RegisterHide;