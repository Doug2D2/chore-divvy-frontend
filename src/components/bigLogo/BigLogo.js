import React from 'react';
import '../bigLogo/BigLogo.css';
import Logo from '../../public/Logo/logo.jpg';
import { Link } from 'react-router-dom';

function BigLogo() {
    return(
        <div>
            <div className='logoDiv'>
                <span className='logoSpan'>
                    {/* <Link to='/'>
                        <i className="small material-icons signUpClose">close</i>
                    </Link> */}
                    <img src={Logo} className='logoImg'></img>
                    <p className='signUpInfo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua. 
                        Mollis aliquam ut porttitor leo a diam sollicitudin tempor. 
                        Rhoncus mattis rhoncus urna neque viverra. 
                        Eu turpis egestas pretium aenean pharetra magna ac placerat. 
                        Turpis cursus in hac habitasse platea dictumst quisque.
                    </p>
                </span>

            </div>
            
        </div>
    )
}

export default BigLogo;
