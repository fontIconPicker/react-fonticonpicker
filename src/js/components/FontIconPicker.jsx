// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';

class App extends React.PureComponent {
	state = {
		// icons: {},
		// search: {},
		// iconsOnPage: [],
	};
	render() {
		console.log('I am from App.jsx');
		return (
			<div>
				<h1>This is so Awesome</h1>
				<p>FontIconPicker</p>
				<p>I am awesome... I guess</p>
			</div>
		);
	}
}

export default App;
