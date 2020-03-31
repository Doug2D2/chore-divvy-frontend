import  React, { Component } from 'react';
import '../loginForm/LoginForm.css';
import { Link, Redirect } from 'react-router-dom';

class LoginForm extends Component {
    state = {
        isLoggedIn: false,
        usernameInput: '',
        passwordInput: '',
        redirect: false
    }

    handleSubmitLoginForm(e, username, password) {
        e.preventDefault();

        fetch('http://localhost:8080/login', {
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
                console.log('if statement');
                this.setState({
                    usernameInput: '',
                    passwordInput: ''
                });
            } else {
                console.log('in else');
                this.setState({ 
                    isLoggedIn: true, 
                    redirect: true 
                });
            }
        })
        .catch(err => {
            console.log(err)
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

        return(
            <div className='row'>
                <h2>Login</h2>
                <span className='formContainer'>
                    <form>
                        <span>
                            <input placeholder='Username' id='username' className='inputStyle' 
                            value={this.state.usernameInput}
                            onChange={this.handleUsernameChange} 
                            />
                            <label htmlFor='username'>Username</label>
                            <input placeholder='Password' id='password' className='inputStyle' 
                            value={this.state.passwordInput}
                            onChange={this.handlePasswordChange}
                            />
                            <label htmlFor='password'>Password</label>
                        </span>

                        <div className='submitBtn'>
                            <button type='submit' className='btn btn-large indigo' 
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
