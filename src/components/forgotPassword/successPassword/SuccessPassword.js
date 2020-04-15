import React from 'react';
import { Link } from 'react-router-dom';
import '../successPassword/SuccessPassword.css';

function SuccessPassword() {
    return (
        <div className='row'>
            <span className='formContainer successContainer'>
                <form>
                    <h5 className='forgotPwText'>An email has been sent.</h5>
                    <h5><Link to='/'>Login here</Link></h5>
                </form>
            </span>
        </div>
    )
}

export default SuccessPassword;
