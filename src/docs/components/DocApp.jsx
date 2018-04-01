import React from 'react';
import { hot } from 'react-hot-loader'; // eslint-disable-line

import FontIconPicker from '../../js/FontIconPicker';
import * as iconDefs from '../helpers/iconDefs';

class DocApp extends React.PureComponent {
	state = {
		value: 'none',
	};
	handleChange = value => {
		const newValue = value;
		this.setState({ value: newValue });
	};
	render() {
		return (
			<React.Fragment>
				<div>
					<h2>
						<i className="icomoon-dice" /> Append to Body{' '}
						<i className="icomoon-quill" />
					</h2>
					<FontIconPicker
						icons={iconDefs.icomoonIcons}
						search={iconDefs.icomoonIconsSearch}
						onChange={this.handleChange}
						appendTo="body"
					/>
					<p>Current value: {this.state.value}</p>
				</div>
				<div>
					<h2>
						<i className="icomoon-dice" /> Append to Self{' '}
						<i className="icomoon-quill" />
					</h2>
					<FontIconPicker
						icons={iconDefs.icomoonIcons}
						search={iconDefs.icomoonIconsSearch}
						onChange={this.handleChange}
					/>
					<p>Current value: {this.state.value}</p>
				</div>
			</React.Fragment>
		);
	}
}

export default hot(module)(DocApp);
