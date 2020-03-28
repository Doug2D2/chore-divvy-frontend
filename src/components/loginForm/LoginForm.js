import  React, { Component } from 'react';
import '../loginForm/LoginForm.css';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
    state = {
        isLoggedIn: false,
        loginCredentials: {},
        usernameInput: "",
        passwordInput: ""
    }

    handleSubmitLoginForm(username, password) {
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
            console.log(res);
        })
        .catch(err => console.log(err));

    }

    handleUsernameChange = (event) => {
        this.setState({ usernameInput: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ passwordInput: event.target.value });
    }

    render() {
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
                                <Link to='/dashboard'>
                                    <button type='submit' className='btn btn-large indigo' 
                                    onClick={() => this.handleSubmitLoginForm(this.state.usernameInput, this.state.passwordInput)}>
                                        Submit
                                    </button>
                                </Link>
                            </div>

                            <p>Not registered? Sign up
                                <Link to='/sign-up-form'>
                                    here
                                </Link>
                            </p>
                    </form>
                </span>
            </div>
        )
    }
}

export default LoginForm;
