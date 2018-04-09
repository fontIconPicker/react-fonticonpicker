// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Sidebar from './Sidebar';
import routes from '../helpers/routes';

import FourOFour from './pages/404';
import BasicUsage from './pages/BasicUsage';
import Examples from './pages/Examples';
import Installation from './pages/Installation';
import Introduction from './pages/Introduction';
import Props from './pages/Props';

let routeBase = '/react-fonticonpicker';
if (process.env.NODE_ENV === 'development') {
	routeBase = '/';
}

const components = {
	BasicUsage,
	Examples,
	Installation,
	Introduction,
	Props,
};

const Routes = () => (
	<BrowserRouter basename={routeBase}>
		<div className="site-main">
			<Sidebar />
			<main className="container-fluid app-main">
				<article className="site-article">
					<Switch>
						{routes.map(route => {
							const RouteComponent = components[route.component];
							return (
								<Route
									key={route.path}
									path={route.path}
									exact
									component={RouteComponent}
								/>
							);
						})}
						<Route component={FourOFour} />
					</Switch>
				</article>
				<footer className="site-footer">
					<p>Copyright Swashata Ghosh.</p>
				</footer>
			</main>
		</div>
	</BrowserRouter>
);

export default Routes;
