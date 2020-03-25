import React from 'react';
import '../loginForm/LoginForm.css';

function LoginForm() {
    return(
        <div className='row'>
            <h2>Login</h2>
            <span className='formContainer'>
                <form>
                    <span>
                        <input placeholder='Username' id='username'/>
                        <label htmlFor='username'>Username</label>
                        <input placeholder='Password' id='password'/>
                        <label htmlFor='password'>Password</label>
                    </span>

                    <div className='submitBtn'>
                        <button type='submit' className='btn indigo'>Submit</button>
                    </div>

                    <p>Not registered? Sign up <a href='#'>here</a></p>

                </form>
            </span>
        </div>
    )
}

export default LoginForm;