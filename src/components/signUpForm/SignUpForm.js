import React, { Component } from 'react';
import '../signUpForm/SignUpForm.css';

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
            .then(data => {
                console.log(data);
                this.setState({
                    isLoggedIn: true,
                    redirect: true,
                    errorMessage: ''
                })
            })
            .catch((err) => {
                this.setState({ errorMessage: 'Server Error'})
            })
        } else {
            this.setState({ errorMessage: 'Password doesn\'t match' })
        }

        
    }

    handleUsernameChange = (event) => {
        this.setState({ usernameInput: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ passwordInput: event.target.value });
    }

    handleConfirmPasswordChange = (event) => {
        this.setState({ confirmPasswordInput: event.target.value });
    }

    handleFirstNameChange = (event) => {
        this.setState({ firstNameInput: event.target.value });
    }

    handleLastNameChange = (event) => {
        this.setState({ lastNameInput: event.target.value });
    }

    render() {
        const enabled = this.state.firstNameInput.length > 0 && this.state.lastNameInput.length > 0 
            && this.state.usernameInput.length > 0 && this.state.passwordInput.length > 0 
            && this.state.confirmPasswordInput.length > 0;

        return(
            <div className='row'>

                <h2>Sign Up</h2>

                <span className='formContainer'>
                    <form>
                        <span>
                            <p className='errorMessage'>{this.state.errorMessage}</p>
                        </span>

                        <label htmlFor='firstName'>First Name</label>
                        <input placeholder='First Name' id='firstName' className='inputStyle' 
                        value={this.state.firstNameInput}
                        onChange={this.handleFirstNameChange}
                        />
                        <label htmlFor='lastName'>Last Name</label>
                        <input placeholder='Last Name' id='lastName' className='inputStyle'
                        value={this.state.lastNameInput}
                        onChange={this.handleLastNameChange}
                        />
                        <label htmlFor='username'>Email</label>
                        <input placeholder='Email' id='username' className='inputStyle'
                        value={this.state.usernameInput}
                        onChange={this.handleUsernameChange}
                        />
                        <label htmlFor='password'>Password</label>
                        <input placeholder='Password' id='password' className='inputStyle' type='password'
                        value={this.state.passwordInput}
                        onChange={this.handlePasswordChange}
                        />
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input placeholder='Confirm Password' id='confirmPassword' className='inputStyle' type='password'
                        value={this.state.confirmPasswordInput}
                        onChange={this.handleConfirmPasswordChange}
                        />

                        <div>
                            <br/>
                            <button type='submit' className='btn btn-large indigo' disabled={!enabled}
                            onClick={(e) => this.handleSubmitSignupForm(e, this.state.usernameInput, this.state.passwordInput, this.state.confirmPasswordInput, this.state.firstNameInput, this.state.lastNameInput )}
                            >Sign up</button>
                        </div>
                    </form>
                </span>
            </div>
        )
    }
}

export default SignUpForm;
