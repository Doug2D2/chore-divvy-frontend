import React from 'react';
import './App.css';
import Header from './components/header/Header';
import LoginForm from './components/loginForm/LoginForm';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='row'>
      <span className='loginStyle col s6'>
        <LoginForm />
      </span>
      </div>
    </div>
  );
}

export default App;
