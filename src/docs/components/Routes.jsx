// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import presets from 'react-motion/lib/spring';

import Sidebar from './Sidebar';
import routes from '../helpers/routes';
import ScrollToTop from './ScrollToTop';
import FourOFour from './pages/404';
import BasicUsage from './pages/BasicUsage';
import Examples from './pages/Examples';
import Installation from './pages/Installation';
import Introduction from './pages/Introduction';
import Props from './pages/Props';
import Themes from './pages/Themes';
import Meta from './pages/Meta';
import { fadeInLeft } from '../helpers/routeTransition';

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
	Themes,
	Meta,
};

const Routes = () => (
	<BrowserRouter basename={routeBase}>
		<ScrollToTop>
			<div className="site-main">
				<Sidebar />
				<main className="container-fluid app-main">
					<article className="site-article">
						<AnimatedSwitch
							atEnter={fadeInLeft.atEnter}
							atLeave={fadeInLeft.atLeave}
							atActive={fadeInLeft.atActive}
							mapStyles={fadeInLeft.mapStyles}
							className="route-wrapper"
						>
							{routes.map(route => {
								const RouteComponent =
									components[route.component];
								return (
									<Route
										key={route.path}
										path={route.path}
										exact={route.exact || false}
										component={RouteComponent}
									/>
								);
							})}
							<Route component={FourOFour} />
						</AnimatedSwitch>
					</article>
				</main>
			</div>
		</ScrollToTop>
	</BrowserRouter>
);

export default Routes;
