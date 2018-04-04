import React from 'react';

import FontIconPicker from '../../js/FontIconPicker';
import * as iconDefs from '../helpers/iconDefs';

class DocApp extends React.PureComponent {
	state = {
		value1: 57436,
		value2: [],
		value3: 57595,
		value4: [57475, 57476, 57477, 57539, 57662, 57404, 57405, 57408],
	};
	handleChange = (key, value) => {
		const newValue = Array.isArray(value) ? [...value] : value;
		this.setState({ [key]: newValue });
	};
	render() {
		return (
			<React.Fragment>
				<div>
					<h2>
						<i className="icomoon-dice" /> Append to Body & Single{' '}
						<i className="icomoon-quill" />
					</h2>
					<React.StrictMode>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							onChange={value =>
								this.handleChange('value1', value)
							}
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
						<i className="icomoon-dice" /> Append to Body & Multi{' '}
						<i className="icomoon-quill" />
					</h2>
					<React.StrictMode>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							onChange={value =>
								this.handleChange('value2', value)
							}
							appendTo="body"
							value={this.state.value2}
							isMulti
						/>
					</React.StrictMode>
					<p>
						Current values:{' '}
						{this.state.value2.map(value => (
							<i
								key={value}
								data-icomoon={String.fromCodePoint(value)}
							/>
						))}
					</p>
				</div>
				<div>
					<h2>
						<i className="icomoon-dice" /> Append to Self & Single{' '}
						<i className="icomoon-quill" />
					</h2>
					<React.StrictMode>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							value={this.state.value3}
							onChange={value =>
								this.handleChange('value3', value)
							}
							isMulti={false}
						/>
					</React.StrictMode>
					<p>
						Current value:{' '}
						<i
							data-icomoon={String.fromCodePoint(
								this.state.value3,
							)}
						/>
					</p>
				</div>
				<div>
					<h2>
						<i className="icomoon-dice" /> Append to Self & Multi{' '}
						<i className="icomoon-quill" />
					</h2>
					<React.StrictMode>
						<FontIconPicker
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							value={this.state.value4}
							onChange={value =>
								this.handleChange('value4', value)
							}
							isMulti
						/>
					</React.StrictMode>
					<p>
						Current value<strong>s</strong>:{' '}
						{this.state.value4.map(value => (
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
