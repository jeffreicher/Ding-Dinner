import React, {Component} from 'react';
import LoginHide from './loginhide';
import RegisterHide from './registerhide';
import dingLogo from '../../assets/images/dingLogoOrangeShadow.png'
import '../../assets/css/login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.loginClicked = this.loginClicked.bind(this);
        this.goBackLogin = this.goBackLogin.bind(this);
        this.registerClicked = this.registerClicked.bind(this);
        this.goBackRegister = this.goBackRegister.bind(this);

        this.state = {
            loginHide: false,
            registerHide: false
        };
    };

    loginClicked(e) {
        e.preventDefault();
        this.setState({
            loginHide: !this.state.loginHide
        });
    };

    registerClicked(e) {
        e.preventDefault();
        this.setState({
            registerHide: !this.state.registerHide
        });
    };

    goBackLogin() {
        this.setState({
            loginHide: !this.state.loginHide
        });
    };

    goBackRegister() {
        this.setState({
            registerHide: !this.state.registerHide
        });
    };

    render() {
        return (
            <div className="loginContainer">
                <img className='loginLogo' src={dingLogo} />
                <h4 className='loginSlogan center-align'>dinner planning made easy</h4>
                <div className='loginButtons'>
                    {this.state.loginHide && <LoginHide history={this.props.history} returnFX={this.goBackLogin}/>}
                    {this.state.registerHide && <RegisterHide history={this.props.history} returnFX={this.goBackRegister}/>}
                    {!this.state.loginHide && !this.state.registerHide && <button className="loginButton btn-large dingOrange z-depth-2" onClick={this.loginClicked}>Login</button>}
                    <br />
                    {!this.state.loginHide && !this.state.registerHide && <button className="registerButton btn-large dingOrange z-depth-2" onClick={this.registerClicked}>Register</button>}
                </div>
            </div>
        );
    };
};

export default Login;