// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import ReactMarkdown from "react-markdown"; // eslint-disable-line

import FontIconPicker from '../../../js/FontIconPicker';
import intro from '../../guides/introduction.md';
import * as iconDefs from '../../helpers/iconDefs';
import codeRenderer from '../CodeBlock';
import pkg from '../../../../package.json';

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
					<h2 className="fip-name">
						React FontIconPicker<sup>v{pkg.version}</sup>
					</h2>
					<p className="badges">
						<a href="https://codecov.io/gh/fontIconPicker/react-fonticonpicker">
							<img
								src="https://codecov.io/gh/fontIconPicker/react-fonticonpicker/branch/master/graph/badge.svg"
								alt="codecov"
							/>
						</a>{' '}
						<a href="https://travis-ci.org/fontIconPicker/react-fonticonpicker">
							<img
								src="https://travis-ci.org/fontIconPicker/react-fonticonpicker.svg?branch=master"
								alt="Build Status"
							/>
						</a>{' '}
						<a href="https://github.com/facebook/jest">
							<img
								src="https://facebook.github.io/jest/img/jest-badge.svg"
								alt="jest"
							/>
						</a>{' '}
						<a href="https://badge.fury.io/js/%40fonticonpicker%2Freact-fonticonpicker">
							<img
								src="https://badge.fury.io/js/%40fonticonpicker%2Freact-fonticonpicker.svg"
								alt="npm version"
								height="18"
							/>
						</a>{' '}
						<a href="https://david-dm.org/fontIconPicker/react-fonticonpicker?type=peer">
							<img
								src="https://david-dm.org/fontIconPicker/react-fonticonpicker/peer-status.svg"
								alt="peerDependencies Status"
							/>
						</a>{' '}
						<a href="https://github.com/fontIconPicker/react-fonticonpicker/blob/master/LICENSE">
							<img
								src="https://img.shields.io/github/license/fontIconPicker/react-fonticonpicker.svg"
								alt="GitHub license"
							/>
						</a>
					</p>
					<div className="intro-fips">
						<FontIconPicker
							onChange={this.handleFontAwesome}
							renderUsing="class"
							icons={iconDefs.fontAwesome}
							value={this.state.vFontAwesome}
							theme="bluegrey"
							isMulti
						/>
						<FontIconPicker
							onChange={this.handleIcoMoon}
							icons={iconDefs.icomoonIcons}
							search={iconDefs.icomoonIconsSearch}
							value={this.state.vIcoMoon}
							theme="teal"
							isMulti={false}
							renderUsing="data-icomoon"
						/>
					</div>
				</div>
				<ReactMarkdown
					source={intro}
					escapeHtml
					renderers={{
						code: codeRenderer,
					}}
				/>
			</div>
		);
	}
}

export default Introduction;
