import React from "react";
import "./HomePage.css";
import Login from "../../components/Forms/Login/Login";
import Navbar from "../../components/navigation/navbar/navbar";
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Footer  from '../../components/navigation/footer/footer';
import Main from '../Main/Main';


class HomePage extends React.PureComponent {
    state = {
    }
    pushIntoRoute = path => {
        this.props.history.push(path);
    }

  render() {
    return (
      <div className="home-page">
        <Navbar pushIntoRoute={this.pushIntoRoute}/>

        <Route path="/login" render={() => {
          return (
            <Login pushIntoRoute={this.pushIntoRoute} />
          )
        }} />

        <Route exact path="/main" component={Main} />
        <Footer  />
      </div>
    );
  }
}
export default withRouter(HomePage);

