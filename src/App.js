import React from 'react';
import './App.css';
import Header from './components/header/Header';
import LoginForm from './components/loginForm/LoginForm';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='row'>
      <span className='loginStyle'>
        <LoginForm />
      </span>
      </div>
    </div>
  );
}

export default App;
