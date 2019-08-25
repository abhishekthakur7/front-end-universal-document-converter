import React from 'react';

import NavBarIcon from '../nav-bar-icon/nav-bar-icon.component';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { signOutStart } from '../../redux/user/user.actions';

import './nav-bar.styles.scss';

class NavBar extends React.Component{

  constructor(props) {
    super(props);
    this.breadCrumb = React.createRef();
  }
  
  handleClick = () => {
    let classes = this.breadCrumb.current.classList;
    console.log(classes);
    if(classes[0]){
      if (classes.value === "topnav") {
        classes.add('responsive');
      } else {
        classes.remove('responsive');
      }
    } else {
      console.error('There are no classes present in element');
    }
  }

  render(){
    const {currentUser, signOutStart} = this.props;
    return(
      <div className="row1 wrapper">
          <header className="header">
            <NavBarIcon />
            <div ref={this.breadCrumb} className="topnav">
              <div>
                <NavLink activeClassName="active firstLink" exact to="/">Home</NavLink>
                <NavLink activeClassName="active" exact to="/contact">Contact Us</NavLink>
                <NavLink activeClassName="active" exact to="/signin" onClick={signOutStart}>
                  {
                    currentUser ? 'Sign Out' : 'Sign In'
                  }
                  </NavLink>
              </div>
              <div>
                <i className="fa fa-bars fa-2x" id="breadCrumb"  onClick={this.handleClick}></i>
              </div>
            </div>
          </header>
    </div>
      )
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () =>  dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);