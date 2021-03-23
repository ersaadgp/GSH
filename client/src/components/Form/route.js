import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = (props) => {
  const { isSignedIn } = props.user;

  useEffect(() => {}, [isSignedIn]);
  if (isSignedIn) return <Route {...props} />;
  else return <Redirect to="/login" />;
};

const mapStateToProps = (state) => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(AuthRoute);
