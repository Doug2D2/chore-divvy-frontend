import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import LoginForm from './components/loginForm/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import SignUpForm from './components/signUpForm/SignUpForm';
import ForgotPassword from './components/forgotPassword/ForgotPassword';

class App extends Component {
  state = {
    isLoggedIn: false
  }

  setIsLoggedIn = (loginBool) => {
    this.setState({ isLoggedIn: loginBool });
  }

  render() {
    return (
      <div className="App">
        <Header setIsLoggedIn={this.setIsLoggedIn} isLoggedInState={this.state.isLoggedIn}/>
        <Router>
          <Switch>
            <Route path='/' exact render={(routeProps) => (<LoginForm {...routeProps} setIsLoggedIn={this.setIsLoggedIn} isLoggedInState={this.state.isLoggedIn}/>)} />
            <Route path='/dashboard' render={(routeProps) => (<Dashboard {...routeProps} setIsLoggedIn={this.setIsLoggedIn} isLoggedInState={this.state.isLoggedIn}/>)}/>
            <Route path='/sign-up-form' component={SignUpForm}/>
            <Route path='/forgot-password' component={ForgotPassword}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
