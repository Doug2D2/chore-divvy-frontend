import React, { Component } from 'react';

class SignUpForm extends Component {
    state = {
        usernameInput: '',
        passwordInput: '',
        confirmPasswordInput: '',
        firstNameInput: '',
        lastNameInput: ''
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
        return(
            <div className='row'>

                <h2>Sign Up</h2>

                <span className='formContainer'>
                    <form>
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
                        <input placeholder='Confirm Password' id='confirmPassword' className='inputStyle'
                        value={this.state.confirmPasswordInput}
                        onChange={this.handleConfirmPasswordChange}
                        />
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input placeholder='First Name' id='firstName' className='inputStyle'
                        value={this.state.firstNameInput}
                        OnChange={this.handleFirstNameChange}
                        />
                        <label htmlFor='firstName'>First Name</label>
                        <input placeholder='Last Name' id='lastName' className='inputStyle'
                        value={this.state.lastNameInput}
                        OnChange={this.handleLastNameChange}
                        />
                        <label htmlFor='lastName'>Last Name</label>

                        <div>
                            <br/>
                            <button type='submit' className='btn btn-large indigo'>Sign up</button>
                        </div>
                    </form>
                </span>
            </div>
        )
    }
}

export default SignUpForm;
