const App = React.createElement('h1', {}, 'React Application');

ReactDOM.render(
  App,
  document.getElementById('root')
);

// Browser에서는 아래와 같은 import나 require를 알 도리가 없다.
// 그래서 Server side에는 CommonJS, Browser에는 Asynchronous Module Definition 명세가 등장해
// JavaScript의 모듈화를 지원하기 시작했다.
// require로 react를 불러올 수 없으므로 index.html에서 facebook CDN을 통해 불러오는 것으로 대체했다.

// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from 'somewhere';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );