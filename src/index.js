import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

if (process.env.NODE_ENV != 'production') {
  console.log('=======================================');
  console.log('Looks like we are in development mode!');
  console.log('=======================================');
}

const render = (Component) => {
  ReactDOM.render(
    <BrowserRouter>
      <Component />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

render(App);
