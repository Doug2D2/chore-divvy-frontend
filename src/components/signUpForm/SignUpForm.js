import React, { Component } from 'react';

class SignUpForm extends Component {

    render() {
        return(
            <div className='row'>
                <span className='formContainer'>
                    <form>
                        <input placeholder='Username' id='username' className='inputStyle'/>
                        <input placeholder='Password' id='password' className='inputStyle'/>
                        <input placeholder='Confirm Password' id='confirmPassword' className='inputStyle'/>
                        <input placeholder='First Name' id='firstName' className='inputStyle'/>
                        <input placeholder='Last Name' id='lastName' className='inputStyle'/>

                        <div>
                            <button type='submit' className='btn btn-large indigo'>Sign up</button>
                        </div>
                    </form>
                </span>
            </div>
        )
    }
}

export default SignUpForm;
