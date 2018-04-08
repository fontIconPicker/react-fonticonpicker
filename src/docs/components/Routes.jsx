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
		<main>
			<aside className="site-nav">
				<Sidebar />
			</aside>
			<article className="site-article">
				<Switch>
					{routes.map(route => {
						const RouteComponent = components[route.component];
						return (
							<Route
								path={route.path}
								exact
								component={RouteComponent}
							/>
						);
					})}
					<Route component={FourOFour} />
				</Switch>
			</article>
		</main>
	</BrowserRouter>
);

export default Routes;
