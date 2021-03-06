import React, { Component } from 'react';
import '../signUpForm/SignUpForm.css';
import BigLogo from '../bigLogo/BigLogo';
import { Link, Redirect } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class SignUpForm extends Component {
    state = {
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
        firstNameInput: '',
        lastNameInput: '',
        errorMessage: ''
    }

    handleSubmitSignupForm = (event, username, password, confirmPassword, firstName, lastName) => {
        event.preventDefault();

        const emailFormatRegEx = /\S+@\S+/;
        let isEmailAddressValid = emailFormatRegEx.test(username);

        if(isEmailAddressValid) {
            if (password === confirmPassword) {
                if(password.length >= 8) {
                    fetch(`${baseUrl}/sign-up`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            firstName: firstName,
                            lastName: lastName
                        })
                    })
                    .then(res => {
                        if(res.status === 401) {
                            this.setState({ 
                                errorMessage: `Account with email ${this.state.usernameInput} already exists`
                            });
                        } else {
                            return res.json();
                        }
                    })
                    .then(newUserData => {
                        localStorage.setItem('user', JSON.stringify({ firstName: newUserData.first_name, userId: newUserData.id, username: newUserData.username }));
                        this.props.setIsLoggedIn(true);
                    })
                    .catch((err) => {
                        this.setState({ errorMessage: 'Server Error'})
                    })
                } else {
                    this.setState({ errorMessage: 'Password must be at least 8 characters long' });
                }
            } else {
                this.setState({ errorMessage: 'Password doesn\'t match' })
            }
        } else {
            this.setState({ errorMessage: 'Invalid email address' });
        }

    }

    handleInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    render() {
        const enabled = this.state.firstNameInput.length > 0 && this.state.lastNameInput.length > 0 
            && this.state.usernameInput.length > 0 && this.state.passwordInput.length > 0 
            && this.state.confirmPasswordInput.length > 0;

            if(this.props.isLoggedInState) {
                return <Redirect push to='/dashboard' />
            }

        return(
            <div className='row'>

                < BigLogo />

                <span className='formContainer signUpContainer'>

                    <Link to='/' className='signUpClose'>
                        <i className="small material-icons signUpClose">close</i>
                    </Link>

                    <form>
                        <span>
                            <h2 className='signUp'>Sign Up</h2>
                        </span>

                        <span>
                            <p className='errorMessage'>{this.state.errorMessage}</p>
                        </span>
                        
                        <input placeholder='First Name' id='firstNameInput' className='inputStyle' name='firstName'
                        value={this.state.firstNameInput}
                        onChange={this.handleInputChange}
                        />
                        <label htmlFor='firstName' >First Name</label>
                        <input placeholder='Last Name' id='lastNameInput' className='inputStyle'
                        value={this.state.lastNameInput}
                        onChange={this.handleInputChange}
                        />
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='email' placeholder='Email' id='usernameInput' className='inputStyle'
                        value={this.state.usernameInput}
                        onChange={this.handleInputChange}
                        />
                        <label htmlFor='username'>Email</label>
                        <input placeholder='Password' id='passwordInput' className='inputStyle' type='password'
                        value={this.state.passwordInput}
                        onChange={this.handleInputChange}
                        />
                        <label htmlFor='password'>Password</label>
                        <input placeholder='Confirm Password' id='confirmPasswordInput' className='inputStyle' type='password'
                        value={this.state.confirmPasswordInput}
                        onChange={this.handleInputChange}
                        />
                        <label htmlFor='confirmPassword'>Confirm Password</label>

                        <div>
                            <br/>
                            <button type='submit' className='btn btn-large indigo' disabled={!enabled}
                            onClick={(e) => this.handleSubmitSignupForm(e, this.state.usernameInput, this.state.passwordInput, this.state.confirmPasswordInput, this.state.firstNameInput, this.state.lastNameInput )}>
                                Sign up
                            </button>
                        </div>
                    </form>
                </span>
            </div>
        )
    }
}

export default SignUpForm;

