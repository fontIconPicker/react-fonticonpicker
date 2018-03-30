import React from 'react';
import { hot } from 'react-hot-loader'; // eslint-disable-line

import FontIconPicker from '../../js/FontIconPicker';
import * as iconDefs from '../helpers/iconDefs';

class DocApp extends React.PureComponent {
	state = {
		value: 'none',
	}
	handleChange = (value) => {
		const newValue = value;
		this.setState({value: newValue});
	}
	render() {
		return (
			<div>
				<h2><i className="icomoon-dice" /> FontIconPicker <i className="icomoon-quill" /></h2>
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					search={iconDefs.icomoonIconsSearch}
					onChange={this.handleChange}
				/>
				<p>Current value: {this.state.value}</p>
			</div>
		);
	}
}

export default hot(module)(DocApp);
