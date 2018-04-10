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
};

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
	return {
		opacity: styles.opacity,
		transform: `translateX(${styles.translateX}px)`,
	};
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
	return spring(val, presets.gentle);
}

// child matches will...
const bounceTransition = {
	// start in a transparent, upscaled state
	atEnter: {
		opacity: 0,
		translateX: 250,
	},
	// leave in a transparent, downscaled state
	atLeave: {
		opacity: bounce(0),
		translateX: bounce(-250),
	},
	// and rest at an opaque, normally-scaled state
	atActive: {
		opacity: bounce(1),
		translateX: bounce(0),
	},
};

const Routes = () => (
	<BrowserRouter basename={routeBase}>
		<ScrollToTop>
			<div className="site-main">
				<Sidebar />
				<main className="container-fluid app-main">
					<article className="site-article">
						<AnimatedSwitch
							atEnter={bounceTransition.atEnter}
							atLeave={bounceTransition.atLeave}
							atActive={bounceTransition.atActive}
							mapStyles={mapStyles}
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
