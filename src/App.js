import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Navigation } from './components';
import { Home, About } from './pages';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Switch>
          <Route path='/about' component={About}/>
          <Route path='/' component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;
