import React from 'react';
import HomePage from './components/homePage/HomePage';
import { Route, Redirect } from 'react-router-dom';
import Main from './components/Main';
import { connect } from 'react-redux';
import Login from './components/Forms/Login/Login';

class RootContainer extends React.PureComponent {
    render() {
        const { loginResult } = this.props;
        return (
            <React.Fragment>
                <Route component={Main} path="/main" />                

                <Route component={Login} path="/login" />

                {loginResult || 
                    <Route component={HomePage} path="/" />
                }

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