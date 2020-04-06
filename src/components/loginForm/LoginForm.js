import  React, { Component } from 'react';
import '../loginForm/LoginForm.css';
import { Link, Redirect } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class LoginForm extends Component {
    state = {
        isLoggedIn: false,
        usernameInput: '',
        passwordInput: '',
        redirect: false,
        loginErrorMsg: ''
    }

    handleSubmitLoginForm(e, username, password) {
        e.preventDefault();

        fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if(res.status > 399) {
                this.setState({
                    usernameInput: '',
                    passwordInput: '',
                    loginErrorMsg: 'The username or password entered is incorrect. Please try again.'
                });
            } else {
                this.setState({ 
                    isLoggedIn: true, 
                    redirect: true 
                });
            }
        })
        .catch(err => {
            this.setState({ loginErrorMsg: 'Server Error '});
        });
    }

    handleUsernameChange = (event) => {
        this.setState({ usernameInput: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ passwordInput: event.target.value });
    }

    render() {
        if(this.state.redirect) {
            return <Redirect push to='/dashboard' />
        }

        const enabled = this.state.usernameInput.length > 0 && this.state.passwordInput.length > 0;
    

        return(
            <div className='row'>
                <h2>Login</h2>
                <span className='formContainer'>
                    <form>
                        <span>
                            <p className='loginErrorMsg'>{this.state.loginErrorMsg}</p>
                        </span>
                        <span>
                            <input placeholder='Email' id='username' className='inputStyle' 
                            value={this.state.usernameInput}
                            onChange={this.handleUsernameChange} 
                            />
                            <label htmlFor='username'>Email</label>
                            <input placeholder='Password' type='password' id='password' className='inputStyle' 
                            value={this.state.passwordInput}
                            onChange={this.handlePasswordChange}
                            />
                            <label htmlFor='password'>Password</label>
                        </span>

                        <p className='forgotPW'><Link>Forgot Password?</Link></p>

                        <div className='submitBtn'>
                            <button type='submit' className='btn btn-large indigo' disabled={!enabled}
                                onClick={(e) => this.handleSubmitLoginForm(e, this.state.usernameInput, this.state.passwordInput)}>
                                Submit
                            </button>
                        </div>

                            <p>Not registered? Sign up
                                <Link to='/sign-up-form'>
                                    &nbsp;here
                                </Link>
                            </p>
                    </form>
                </span>
            </div>
        )
    }
}

export default LoginForm;
