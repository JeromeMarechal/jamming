import React from 'react';
import './header.css';

const Header = ({username}) => {
    return (
        <div className='header'>
            <h1>JAMMING</h1>
            <h3>{username ? username : "Guest"}</h3>
            <div className='headerButtons'>
                <button className='login-btn'>Log In</button>
                <button className='signin-btn'>Sign In</button>
            </div>
        </div>
    )
}

export default Header; 