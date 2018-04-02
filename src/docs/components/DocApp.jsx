import React from 'react';

import FontIconPicker from '../../js/FontIconPicker';
import * as iconDefs from '../helpers/iconDefs';

if (process.env.NODE_ENV !== 'production') {
	const { whyDidYouUpdate } = require('why-did-you-update'); // eslint-disable-line
	whyDidYouUpdate(React);
}

class DocApp extends React.PureComponent {
	state = {
		value1: 57436,
		value2: [],
	};
	handleChange = (key, value) => {
		const newValue = Array.isArray(value) ? [...value] : value;
		this.setState({ [key]: newValue });
	};
	handleOneChange = value => {
		this.handleChange('value1', value);
	};
	handleTwoChange = value => {
		this.handleChange('value2', value);
	};
	render() {
		return (
			<React.Fragment>
				<div>
					<h2>
						<i className="icomoon-dice" /> Append to Body{' '}
						<i className="icomoon-quill" />
					</h2>
					<React.StrictMode>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							onChange={this.handleOneChange}
							appendTo="body"
							value={this.state.value1}
							isMulti={false}
						/>
					</React.StrictMode>
					<p>
						Current value:{' '}
						<i
							data-icomoon={String.fromCodePoint(
								this.state.value1,
							)}
						/>
					</p>
				</div>
				<div>
					<h2>
						<i className="icomoon-dice" /> Append to Self{' '}
						<i className="icomoon-quill" />
					</h2>
					<React.StrictMode>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							value={this.state.value2}
							onChange={this.handleTwoChange}
						/>
					</React.StrictMode>
					<p>
						Current value<strong>s</strong>:{' '}
						{this.state.value2.map(value => (
							<i
								key={value}
								data-icomoon={String.fromCodePoint(value)}
							/>
						))}
					</p>
				</div>
			</React.Fragment>
		);
	}
}

export default DocApp;
// export default DocApp;
