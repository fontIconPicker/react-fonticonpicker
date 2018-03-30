// import node stuff
import React from 'react';
import {render} from 'react-dom';

// import local dependencies
import DocApp from './components/DocApp';

// import styles
import './fonts/icomoon/style.css';
import './fonts/fontello/css/fontello.css';
import './scss/style.scss';

render( <DocApp />, document.getElementById('app') );
