import React from 'react';
import { NavLink } from 'react-router-dom'
import './nav-bar-icon.styles.scss';

const NavBarIcon = () => (
    <div id="logo" className="header__logo">
         <h1 className="logoname"><NavLink exact to="/">U<span>D</span><span>C</span></NavLink></h1>
    </div>
);

export default NavBarIcon;