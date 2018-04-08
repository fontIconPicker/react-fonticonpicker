// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import ReactMarkdown from "react-markdown"; // eslint-disable-line

import FontIconPicker from '../../../js/FontIconPicker';
import intro from '../../guides/introduction.md';
import * as iconDefs from '../../helpers/iconDefs';

class Introduction extends React.Component {
	state = {
		vFontAwesome: ['fab fa-accessible-icon', 'fas fa-rss'],
		vIcoMoon: 57571,
	};

	handleFontAwesome = values => {
		this.setState({ vFontAwesome: values });
	};

	handleIcoMoon = value => {
		this.setState({ vIcoMoon: value });
	};

	render() {
		return (
			<div className="fip-intro">
				<div className="text-center">
					<svg className="fonticonpicker-logo">
						<use
							xlinkHref="#fonticonpicker-logo"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						/>
					</svg>
					<h2 className="fip-name">React FontIconPicker</h2>
					<div className="intro-fips">
						<FontIconPicker
							onChange={this.handleFontAwesome}
							renderUsing="class"
							icons={iconDefs.fontAwesome}
							value={this.state.vFontAwesome}
							theme="bluegrey"
						/>
						<FontIconPicker
							onChange={this.handleIcoMoon}
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							value={this.state.vIcoMoon}
							theme="teal"
							isMulti={false}
						/>
					</div>
				</div>
				<ReactMarkdown source={intro} />
			</div>
		);
	}
}

export default Introduction;
