import bar from './bar';

function app() {
  const div = document.createElement('div');
  const btn = document.createElement('button');

  div.innerHTML = 'Hello';
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = bar;
  div.appendChild(btn);

  return div;
}

document.body.appendChild(app());
