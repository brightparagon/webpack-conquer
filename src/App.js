import bar from './bar';
import './style.css';
import the1975 from './the1975.jpg'
import exampleJsonData from './data.json';

function app() {
  const contents = document.createElement('h1');
  contents.innerHTML = 'Hello Webpack!';
  contents.className = 'hello';

  const myImage = new Image();
  myImage.src = the1975;
  contents.appendChild(myImage);

  console.log(exampleJsonData);

  return contents;
}

document.body.appendChild(app());
document.body.appendChild(bar());
