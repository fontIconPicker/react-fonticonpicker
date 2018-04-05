// import node stuff
import React from 'react';
import { render } from 'react-dom';

// import local dependencies
import DocApp from './components/DocApp';
import '../js/ThemeBase';
import '../js/ThemeMaterial';

// import styles
import './assets/icomoon/style.css';
import './assets/superhero/style.css';
import './assets/fontello/css/fontello.css';
import './scss/style.scss';

render(<DocApp />, document.getElementById('app'));
