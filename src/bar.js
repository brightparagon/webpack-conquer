import './another.css';

function bar() {
  const contents = document.createElement('h3');
  contents.innerHTML = 'Another Element!'
  contents.className = 'another';

  return contents;
}

export default bar;
