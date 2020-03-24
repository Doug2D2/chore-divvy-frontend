import React from 'react';
import '../loginForm/LoginForm.css';

function LoginForm() {
    return(
        <div>
            <form>
                <span>
                    <input placeholder='Username' id='username'/>
                    <label htmlFor='username'>Username</label>
                    <input placeholder='Password' id='password'/>
                    <label htmlFor='password'>Password</label>
                </span>

                <span className='submitBtn'>
                    <button type='submit' className='btn'>Submit</button>
                </span>
            </form>
        </div>
    )
}

export default LoginForm;