import React, { Component } from 'react';
import '../forgotPassword/ForgotPassword.css';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class ForgotPassword extends Component {
    render() {
        return (
            <div>
                <h1>Forgot Password Works!</h1>
            </div>
        )
    }
}

export default ForgotPassword;
