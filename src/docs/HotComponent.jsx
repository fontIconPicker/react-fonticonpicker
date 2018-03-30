import React from 'react';
import FontIconPicker from '../js/FontIconPicker';
import { hot } from 'react-hot-loader'; // eslint-disable-line

const HotComponent = () => (
	<div>
		<h1>Demo with examples of the component</h1>
		<FontIconPicker />
	</div>
);

export default hot(module)(HotComponent);
