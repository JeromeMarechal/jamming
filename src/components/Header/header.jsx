import React, { useState, useEffect } from 'react';
import './header.css';

const Header = ({ profile, login }) => {

    return (
        <div className='header'>
            <div className='app-name'><h1>JAMMMING</h1></div>
            <div className='user-name'>{profile ? (<h3>{profile.display_name}</h3>) : (<h3>Guest</h3>)}</div>
            <div className='header-btn'><button className='login-btn' onClick={login}>Log In</button></div>
        </div>
    )
}

export default Header;