import React from 'react';
import {render} from 'react-dom';
import FontIconPicker from '../js/FontIconPicker';

const Demo = () => (
	<div>
		<h1>Demo with examples of the component</h1>
		<FontIconPicker />
	</div>
);

render( <Demo />, document.getElementById('app') )
