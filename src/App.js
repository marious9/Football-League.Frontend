import React, { Component } from 'react';
import RootContainer from "./RootContainer";
import { Switch, Router } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <RootContainer />
                </Switch>
            </Router>
        );
    }
}

export default App;
