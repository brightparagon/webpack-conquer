import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './pages';

class App extends Component {
  render() {
    return (
      <div>
        Hello App Component
        <Route exact path='/' component={Home} />
      </div>
    );
  }
}

export default App;
