import React from "react";
import "./HomePage.css";
import Login from "../../components/Forms/Login/Login";
import Navbar from "../../components/navigation/navbar/navbar";
import { Route } from 'react-router-dom';
import Footer  from '../../components/navigation/footer/footer';
import Main from '../Main/Main';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { logoutActionCreator } from '../../store/actions/Authenticate';
import LeagueContainer from '../../containers/LeagueContainer/LeagueContainer';

class HomePage extends React.PureComponent {
    state = {
        isLogged: !!this.props.cookies.get('FootballApp')
    }
    pushIntoRoute = path => {
        this.props.history.push(path);
    }

    static getDerivedStateFromProps(props, state) {
        if(!props.cookies.get('FootballApp')) {
            return {isLogged: false}
        }
        else if(!!props.cookies.get('FootballApp')) {
            return {isLogged: true}
        }
        else {
            return null;
        }
    }

  render() {
       const {isLogged} = this.state;
       const {history, logout} = this.props;
        return (
        <div className="home-page">
            <Navbar pushIntoRoute={this.pushIntoRoute} isLogged={isLogged} logout={() => logout(history)}/>
            <Route exact path="/main" component={Main} />
            <Route path="/main/league/:id" component={LeagueContainer} />

            {!isLogged && <Route path="/login" render={() => {
            return (
                <Login pushIntoRoute={this.pushIntoRoute} />
            )
            }} />}
            <Footer />
        </div>
        );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loginResult: state.Authenticate.loginResult,
        cookies: ownProps.cookies
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        logout: history => dispatch(logoutActionCreator(history,"/main"))
    };
  }
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(HomePage));

