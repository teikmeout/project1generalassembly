import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Game from './components/Game/Game';
import Nomatch from './components/Nomatch/Nomatch';

class Routes extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
          {/*Instructions*/}
            <Route exact path="/" component={Landing} />
          {/*Game page*/}
            <Route path="/game/:mode" component={Game} />
          {/*Resutls page*/}
          {/*no match route*/}
            <Route component={Nomatch}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
