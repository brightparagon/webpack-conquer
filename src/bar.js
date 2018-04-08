// import './another.css';
import styles from './another.css';

function bar() {
  const contents = document.createElement('h3');
  contents.innerHTML = 'Another Element!'
  // contents.className = 'another';
  contents.className = styles.another;

  return contents;
}

export default bar;
