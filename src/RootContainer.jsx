import React from 'react';
import HomePage from './containers/HomePage/HomePage';
import { Route, withRouter } from 'react-router-dom';

class RootContainer extends React.PureComponent {
  render() {
    return (
        <React.Fragment>          
            <Route path="/" component={HomePage}/>            
          />
        </React.Fragment>
    );
  }
}

export default withRouter(RootContainer);