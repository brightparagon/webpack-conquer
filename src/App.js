import bar from './bar';
// import _ from 'lodash';

function app() {
  const contents = document.createElement('h1');
  contents.innerHTML = 'Hello' + bar();
  // contents.innerHTML = _.join(['Hello', bar()], ' ');

  return contents;
}

document.body.appendChild(app());
