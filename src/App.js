import React from 'react';
import './App.css';
import Header from './components/header/Header';
import LoginForm from './components/loginForm/LoginForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import SignUpForm from './components/signUpForm/SignUpForm';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route path='/' exact component={LoginForm}/>
          <Route path='/dashboard' component={Dashboard}/>
          <Route path='/sign-up-form' component={SignUpForm}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
