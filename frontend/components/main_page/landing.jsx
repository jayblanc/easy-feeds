import React from 'react';
import { Route } from 'react-router-dom';
import SessionFormContainer from '../session/session_form_container';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';

const Landing = (props) => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to EasyFeeds</h1>
        <p>An easy way to aggregate stories from across the web.</p>
        <button
          className="green-button"
          onClick={e => props.history.push("/signup")}>
          Get Started</button>
        <button
          className="green-button demo-user"
          onClick={e =>
            props.login({email: "demo@email.com",
              password: "demopassword123"})
          }>
          Demo User</button>
        <div className="landing-image-container">
          <p>Screenshot of final app goes here.</p>
        </div>
        <Route path="/login" component={SessionFormContainer} />
        <Route path="/signup" component={SessionFormContainer} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return ({
    login: credentials => dispatch(login(credentials))
  });
};

export default connect(null, mapDispatchToProps)(Landing);
