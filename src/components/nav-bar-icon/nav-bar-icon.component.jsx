import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBarIcon = () => (
    <div id="logo" className="fl_left">
         <h1 className="logoname"><NavLink exact to="/">U<span>D</span><span>C</span></NavLink></h1>
    </div>
);

export default NavBarIcon;