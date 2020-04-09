import React, { Component } from 'react';
import '../forgotPassword/ForgotPassword.css';
import { Redirect } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class ForgotPassword extends Component {
    state = {
        usernameInput: '',
        errMessage: '',
        redirect: false
    }

    handleResetChange(e, username) {
        e.preventDefault();

        const emailFormatRegEx = /\S+@\S+/;
        let isEmailAddressValid = emailFormatRegEx.test(username);

        if(isEmailAddressValid) {
            fetch(`${baseUrl}/forgot-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
            })
            .then(res => {
                if(res.status === 400) {
                    this.setState({ 
                        errMessage: `Username ${username} doesn't exist.`
                     });
                } else {
                    this.setState({ 
                        redirect: true 
                    });
                }
            })
            .catch(err => {
                this.setState({ errMessage: 'Server Error' });
            })
        } else {
            this.setState({ errMessage: 'Invalid email address' });
        }
    }

    handleUsernameChange = (e) => {
        this.setState({ usernameInput: e.target.value });
    }

    render() {
        if(this.state.redirect) {
            return <Redirect push to='/success-password'/>
        }

        return (
            <div className='row'>
                <span className='formContainer'>
                    <form>
                        <h5 className='forgotPwText'>Forgot Password?</h5>
                        <p className='forgotPwText'>Enter your email and we'll send you your new password.</p>
                        <br/>
                        <p className='forgotPwErrorMsg'>{this.state.errMessage}</p>
                        <input placeholder='Email' id='username' className='inputStyle'
                        onChange={this.handleUsernameChange}
                        />
                        <label htmlFor='username'>Email</label>

                        <button type='submit' className='btn btn-large indigo'
                        onClick={(e) => this.handleResetChange(e, this.state.usernameInput)}>
                            Reset Password
                        </button>
                    </form>
                </span>
            </div>
        )
    }
}

export default ForgotPassword;
