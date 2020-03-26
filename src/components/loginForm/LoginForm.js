import  React, { Component } from 'react';
import '../loginForm/LoginForm.css';
import { Link } from 'react-router-dom';

class LoginForm extends Component {

    render() {
        return(
            <div className='row'>
                <h2>Login</h2>
                <span className='formContainer'>
                    <form>
                        <span>
                            <input placeholder='Username' id='username' className='inputStyle'/>
                            <label htmlFor='username'>Username</label>
                            <input placeholder='Password' id='password' className='inputStyle'/>
                            <label htmlFor='password'>Password</label>
                        </span>

                            <div className='submitBtn'>
                                <Link to='/dashboard'>
                                    <button type='submit' className='btn btn-large indigo'>Submit</button>
                                </Link>
                            </div>

                            <p>Not registered? Sign up
                                <Link to='/sign-up-form'>
                                    here
                                </Link>
                            </p>
                    </form>
                </span>
            </div>
        )
    }
}

export default LoginForm;
