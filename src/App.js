import bar from './bar';
// import './style.css';
import styles from './style.css';
import the1975 from './the1975.jpg'
import exampleJsonData from './data.json';

function app() {
  const division = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Hello Webpack!';
  // h1.className = 'another';
  h1.className = styles.another;

  const img = new Image();
  // img.className = 'center';
  img.className = styles.center;
  img.src = the1975;

  division.appendChild(h1);
  division.appendChild(img);

  console.log(exampleJsonData);

  return division;
}

document.body.appendChild(app());
document.body.appendChild(bar());
