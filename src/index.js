import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './index.css';

if (process.env.NODE_ENV !== 'production') {
  console.log('=======================================');
  console.log('Looks like we are in development mode!');
  console.log('=======================================');
}

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  })
}
