import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBar from './components/nav-bar/nav-bar.component';
import CopyrightFooter from './pages/copyright-footer/copyright-footer.component';

import Notfound from './pages/not-found/not-found.component';
import HomePage from './pages/homepage/homepage.component';
import SignInSignUp from './pages/sign-in-sign-up/sign-in-sign-in.component';
import ContactUs from './pages/contact-us/contact-us.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';


class App extends React.Component {

  render() {
    return (
      <div id='pageContainer'>
        <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/contact' component={ContactUs} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                  <SignInSignUp />
                )
            }
          />
          <Route component={Notfound} />
        </Switch>
        <CopyrightFooter />
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);