import React from 'react';
import '../header/Header.css';

function Header() {
    return(
        <div>
              <nav>
                <div className="nav-wrapper">
                <a href="/" className="brand-logo center"><h1 className='brand-logo-title'>Chore Divvy</h1></a>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><a href="/">Home</a></li>
                    <li><a href="/sign-up-form">Sign Up</a></li>
                </ul>
                </div>
            </nav>
            
        </div>
    )
}

export default Header;
