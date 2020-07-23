import React, { Component } from 'react';
import '../header/Header.css';

class Header extends Component{
    state = {
        isLoggedIn: false
    }

    componentDidMount() {
        if(localStorage.getItem('user')) {
            this.setState({ isLoggedIn: true });
        }
    }

    handleLogout(e) {
        e.preventDefault();
        localStorage.clear();
        this.setState({
            isLoggedIn: false
        });
        window.location.reload();
    }


    render() {
        return(
            <div>
                  <nav>
                    <div className="nav-wrapper">
                    <a href="/" className="brand-logo center"><h1 className='brand-logo-title'>Chore Divvy</h1></a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="/">Home</a></li>
                        <li><a href="/sign-up-form">Sign Up</a></li>
                    </ul>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                    { this.state.isLoggedIn ? 
                            <li onClick={(e) => this.handleLogout(e)}><a href="/">Logout</a></li>
                        :
                            <li></li>
                    }
                    </ul>
                    </div>
                </nav>
                
            </div>
        )
    }
}

export default Header;
