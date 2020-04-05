import React, { Component } from 'react';
import '../signUpForm/SignUpForm.css';
import { Redirect } from 'react-router-dom';

class SignUpForm extends Component {
    state = {
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
        firstNameInput: '',
        lastNameInput: '',
        isLoggedIn: false,
        redirect: false,
        errorMessage: ''
    }

    handleSubmitSignupForm = (event, username, password, confirmPassword, firstName, lastName) => {
        event.preventDefault();

        if(password === confirmPassword) {
            fetch('http://localhost:8080/sign-up', {
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
                console.log(res);
                if(res.status === 401) {
                    this.setState({ 
                        errorMessage: `Account with email ${this.state.usernameInput} already exists`,
                        // redirect: false 
                    })
                } else {
                    this.setState({
                        isLoggedIn: true,
                        redirect: true,
                        errorMessage: ''
                    })
                }
            })
            .catch((err) => {
                this.setState({ errorMessage: 'Server Error'})
            })
        } else {
            this.setState({ errorMessage: 'Password doesn\'t match' })
        }
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    render() {
        const enabled = this.state.firstNameInput.length > 0 && this.state.lastNameInput.length > 0 
            && this.state.usernameInput.length > 0 && this.state.passwordInput.length > 0 
            && this.state.confirmPasswordInput.length > 0;

            if(this.state.redirect) {
                return <Redirect push to='/dashboard' />
            }

        return(
            <div className='row'>

                <span className='formContainer'>
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
                        <input placeholder='Email' id='usernameInput' className='inputStyle'
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

