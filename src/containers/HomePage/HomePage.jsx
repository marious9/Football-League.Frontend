import React from "react";
import "./HomePage.css";
import Register from "../../components/Forms/Register/Register";
import Login from "../../components/Forms/Login/Login";
import Navbar from "../../components/navigation/navbar/navbar";
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';


class HomePage extends React.PureComponent {
    state = {
    }
    pushIntoRoute = path => {
        this.props.history.push(path);
    }

  render() {
    return (
      <main className="home-page">
        <div id="bg2" />
        <Navbar pushIntoRoute={this.pushIntoRoute}/>

        <Route path="/register" exact render={() => {
          return (
            <Register pushIntoRoute={this.pushIntoRoute} />
          )
        }} />

        <Route path="/login" render={() => {
          return (
            <Login pushIntoRoute={this.pushIntoRoute} />
          )
        }} />
      </main>
    );
  }
}
export default withRouter(HomePage);

