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
//import MaterialNavbar from '../../components/navigation/materialNavbar/MaterialNavbar';
import LeagueTableContainer from "../LeagueContainer/LeagueTableContainer/LeagueTableContainer";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MatchContainer from '../MatchContainer/MatchContainer';
import MatchDetailsContainer from '../MatchContainer/MatchDetailsContainer/MatchDetailsContainer';
import TeamContainer from '../TeamContainer/TeamContainer';
import LeagueStatisticsContainer from '../LeagueContainer/LeagueStatisticsContainer/LeagueStatisticsContainer';
import TeamDetailsContainer from '../TeamContainer/TeamDetailsContainer/TeamDetailsContainer';
import AccountContainer from '../AccountContainer/AccountContainer';

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

    getLeagueIdFromUrl () {
        const path = this.props.history.location.pathname.split('');
        let forthSlashIndex = 0
        path.reduce((acc,char, index) => {
            if(char === '/' && acc === 3) forthSlashIndex = index;
            return char === '/' ? acc + 1 : acc
        }, 0)
        const leagueId = path.slice(0,forthSlashIndex).filter((char) => {
            return Number(char)
        } )
        return leagueId.toString()
    }

  render() {
       const {isLogged} = this.state;
       const {history, logout} = this.props;
        return (
        <MuiThemeProvider theme={theme}>
            <div className="home-page">
            
                <Navbar pushIntoRoute={this.pushIntoRoute} isLogged={isLogged} leagueId={this.getLeagueIdFromUrl()} logout={() => logout(history)}/>
                {history.location.pathname === "/" && <Redirect
                    to={"/main"} />}                
                <Route exact path="/main" component={Main} />
                <Route exact path="/main/league/:id" component={LeagueContainer} />
                <Route exact path="/main/league/:id/table" component={LeagueTableContainer} />
                <Route exact path="/main/league/:id/statistics" component={LeagueStatisticsContainer} />                
                <Route exact path="/main/league/:id/match" component={MatchContainer} />
                <Route exact path="/main/league/:id/teams" component={TeamContainer} />
                <Route exact path="/main/league/:id/match/:matchId" component={MatchDetailsContainer} />
                <Route exact path="/main/league/:id/teams/:teamId" component={TeamDetailsContainer} />
                {isLogged && <Route exact path="/account" component={AccountContainer} /> }

                {!isLogged && <div> 
                    <Route path="/login" render={() => <Login pushIntoRoute={this.pushIntoRoute} /> }/>   
                 </div>
                 }
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

