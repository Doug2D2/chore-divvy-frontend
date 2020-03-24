import React from 'react';
import '../loginForm/LoginForm.css';

function LoginForm() {
    return(
        <div className='row'>
            <form className='col s10'>
                <span>
                    <input placeholder='Username' id='username'/>
                    <label htmlFor='username'>Username</label>
                    <input placeholder='Password' id='password'/>
                    <label htmlFor='password'>Password</label>
                </span>

                <div className='submitBtn'>
                    <button type='submit' className='btn'>Submit</button>
                </div>
                <span>
                    <p>Not registered? Sign up <a href='#'>here</a></p>
                </span>
            </form>
        </div>
    )
}

export default LoginForm;