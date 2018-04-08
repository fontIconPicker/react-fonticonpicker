// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"; // eslint-disable-line

import Routes from './Routes';
import Logo from '../assets/fip.svg';

const DocApp = () => (
	<React.Fragment>
		<header className="site-title">
			<h1>
				<svg className="fonticonpicker-logo">
					<use
						xlinkHref="#fonticonpicker-logo"
						xmlnsXlink="http://www.w3.org/1999/xlink"
					/>
				</svg>
				<span className="title-text">React font icon picker</span>
			</h1>
		</header>
		<Routes />
	</React.Fragment>
);

export default DocApp;
