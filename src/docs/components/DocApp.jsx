// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"; // eslint-disable-line

import Routes from './Routes';

const DocApp = () => (
	<React.Fragment>
		<header>
			<h1 className="site-title">
				<img
					src="../assets/fip.svg"
					alt="FontIconPicker"
					inline="true"
					id="site-logo"
				/>
				<span className="title-text">FontIconPicker</span>
			</h1>
		</header>
		<Routes />
		<footer>
			<p>Copyright Swashata Ghosh.</p>
		</footer>
	</React.Fragment>
);

export default DocApp;
