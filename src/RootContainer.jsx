import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route } from 'react-router-dom';
import Main from './containers/Main/Main';
import { connect } from 'react-redux';


class RootContainer extends React.PureComponent {
  render() {
    //const { loginResult } = this.props;
    return (
        <React.Fragment>
            <Route component={Main} path="/main" />
            
            <Route component={HomePage} path="/" />            
            
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
      loginResult: state.Authenticate.loginResult
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);