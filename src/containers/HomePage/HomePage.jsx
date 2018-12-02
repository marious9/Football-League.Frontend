import React from "react";
import "./HomePage.css";
import Login from "../../components/Forms/Login/Login";
import Navbar from "../../components/navigation/navbar/navbar";
import { Route, Redirect } from 'react-router-dom';
import Footer  from '../../components/navigation/footer/footer';
import Main from '../Main/Main';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { logoutActionCreator } from '../../store/actions/Authenticate';
import LeagueContainer from '../../containers/LeagueContainer/LeagueContainer';
import MaterialNavbar from '../../components/navigation/materialNavbar/MaterialNavbar';
import LeagueTableContainer from "../LeagueContainer/LeagueTableContainer/LeagueTableContainer";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MatchContainer from '../MatchContainer/MatchContainer';
import MatchDetailsContainer from '../MatchContainer/MatchDetailsContainer/MatchDetailsContainer';
import TeamContainer from '../TeamContainer/TeamContainer';

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
      suppressDeprecationWarnings: true
    }
  });

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
        <MuiThemeProvider theme={theme}>
            <div className="home-page">
            
                <Navbar pushIntoRoute={this.pushIntoRoute} isLogged={isLogged} logout={() => logout(history)}/>
                {history.location.pathname === "/" && <Redirect
                    to={"/main"} />}                
                <Route exact path="/main" component={Main} />
                <Route exact path="/main/league/:id" component={LeagueContainer} />
                <Route exact path="/main/league/:id/table" component={LeagueTableContainer} />
                <Route exact path="/main/league/:id/match" component={MatchContainer} />
                <Route exact path="/main/league/:id/teams" component={TeamContainer} />
                <Route exact path="/main/league/:id/match/:matchId" component={MatchDetailsContainer} />

                {!isLogged && <Route path="/login" render={() => 
                    <Login pushIntoRoute={this.pushIntoRoute} /> }
                 />}
                <Footer />
            </div>
        </MuiThemeProvider>
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

