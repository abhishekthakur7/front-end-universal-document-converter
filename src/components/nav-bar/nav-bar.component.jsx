import React from 'react';

import NavBarIcon from '../nav-bar-icon/nav-bar-icon.component';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { signOutStart } from '../../redux/user/user.actions';

const NavBar = ({currentUser, signOutStart}) => (
  <div className="wrapper row1">
    <header id="header" className="hoc clear">
    <NavBarIcon />
    <nav id="mainav" className="fl_right">
      <ul className="clear">
        <li className="links"><NavLink activeClassName="active" exact to="/">Home</NavLink></li>
        <li className="links"><NavLink activeClassName="active" exact to="/contact">Contact Us</NavLink></li>
        <li className="links"><NavLink activeClassName="active" exact to="/signin" onClick={signOutStart}>
          {
            currentUser ? 'SIGN OUT' : 'SIGN IN'
          }
          </NavLink>
        </li>
      </ul>
    </nav>
    </header>
  </div>
);

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () =>  dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);