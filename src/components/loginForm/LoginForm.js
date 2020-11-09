import  React, { Component } from 'react';
import '../loginForm/LoginForm.css';
import { Link, Redirect } from 'react-router-dom';
const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

class LoginForm extends Component {
    state = {
        usernameInput: '',
        passwordInput: '',
        loginErrorMsg: ''
    }

    componentDidMount() {
        this.user = localStorage.getItem('user');
        if(this.user) {
            this.props.setIsLoggedIn(true);
        }
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmitLoginForm(e, username, password) {
        e.preventDefault();

        fetch(`${baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if(res.status > 399) {
                throw 'Error';
            } else {
                return res.json();
            }
        })
        .then(data => {
            localStorage.setItem('user', JSON.stringify({ firstName: data.first_name, userId: data.id, username: data.username }));
            this.props.setIsLoggedIn(true);
        })
        .catch(err => {
            this.setState({
                usernameInput: '',
                passwordInput: '',
                loginErrorMsg: 'The username or password entered is incorrect. Please try again.'
            });
        });
    }

    render() {
        if(this.props.isLoggedInState) {
            return <Redirect push to='/dashboard' />
        }

        const enabled = this.state.usernameInput.length > 0 && this.state.passwordInput.length > 0;
    

        return(
            <div className='row'>
                
                <span className='formContainer loginContainer'>
                    <form>
                        <h2>Login</h2>
                        <span>
                            <p className='loginErrorMsg'>{this.state.loginErrorMsg}</p>
                        </span>
                        <span>
                            <input placeholder='Email' id='username' className='inputStyle'  name='usernameInput'
                            value={this.state.usernameInput}
                            onChange={this.handleInputChange} 
                            />
                            <label htmlFor='username'>Email</label>
                            <input placeholder='Password' type='password' id='password' className='inputStyle' name='passwordInput'
                            value={this.state.passwordInput}
                            onChange={this.handleInputChange}
                            />
                            <label htmlFor='password'>Password</label>
                        </span>

                        <p className='forgotPW'><Link to='/forgot-password'>Forgot Password?</Link></p>

                        <div className='submitBtn'>
                            <button type='submit' className='btn btn-large indigo' disabled={!enabled}
                                onClick={(e) => this.handleSubmitLoginForm(e, this.state.usernameInput, this.state.passwordInput)}>
                                Submit
                            </button>
                        </div>

                            <p>Not registered? Sign up
                                <Link to='/sign-up-form'>
                                    &nbsp;here
                                </Link>
                            </p>
                    </form>
                </span>
            </div>
        )
    }
}

export default LoginForm;
