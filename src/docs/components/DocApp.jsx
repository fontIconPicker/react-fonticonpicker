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
				<span className="title-text">fonticonpicker</span>
			</h1>
		</header>
		<Routes />
		<footer className="site-footer">
			<p className="copyright">
				&copy; <a href="https://swashata.me">Swashata Ghosh</a> -{' '}
				{new Date().getFullYear()} -{' '}
				<a href="https://opensource.org/licenses/MIT">MIT</a>
			</p>
			<p className="social">
				<a className="link github" href="https://github.com/swashata">
					<i title="GitHub" className="fab fa-github" />
				</a>
				<a className="link twitter" href="https://twitter.com/swashata">
					<i title="Twitter" className="fab fa-twitter" />
				</a>
				<a className="link blog" href="https://swashata.me">
					<i title="Blog" className="fas fa-globe" />
				</a>
				<a className="link wpquark" href="https://wpquark.com">
					<i title="WPQuark" className="fas fa-briefcase" />
				</a>
			</p>
		</footer>
	</React.Fragment>
);

export default DocApp;
