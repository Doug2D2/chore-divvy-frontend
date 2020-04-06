import React, { Component } from 'react';
import '../forgotPassword/ForgotPassword.css';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class ForgotPassword extends Component {
    render() {
        return (
            <div className='row'>
                <span className='formContainer'>
                    <form>
                        <h5>Forgot Password?</h5>
                        <p>Enter your email and we'll send you your new password.</p>
                        <br/>
                        <input placeholder='Email' id='username' className='inputStyle'/>
                        <label htmlFor='username'>Email</label>

                        <button type='submit' className='btn btn-large indigo'>
                            Reset Password
                        </button>
                    </form>
                </span>
            </div>
        )
    }
}

export default ForgotPassword;
