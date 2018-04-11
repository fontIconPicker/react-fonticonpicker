// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Route, NavLink } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import presets from 'react-motion/lib/spring';

import FontIconPicker from '../../../js/FontIconPicker';
import * as iconDefs from '../../helpers/iconDefs';
import basicusage from '../../guides/basicusage.md';
import fipncp from '../../guides/usage-parts/1-fipncp.md';
import fipcp from '../../guides/usage-parts/2-fipcp.md';
import fipsmp from '../../guides/usage-parts/3-fipsmp.md';
import fipar from '../../guides/usage-parts/4-fipar.md';
import fipcr from '../../guides/usage-parts/5-fipcr.md';
import codeRenderer from '../CodeBlock';
import { fadeInUp } from '../../helpers/routeTransition';

const noop = () => {};

const FipNoCategory = () => (
	<div className="text-center">
		<strong>Output: </strong>
		<FontIconPicker
			icons={iconDefs.fontAwesome.Vehicles}
			onChange={noop}
			value="fas fa-truck"
			isMulti={false}
		/>
	</div>
);

const FipCategory = () => (
	<div className="text-center">
		<strong>Output: </strong>
		<FontIconPicker
			icons={iconDefs.fontAwesome}
			onChange={noop}
			value={['fas fa-truck', 'fas fa-subway']}
			isMulti
		/>
	</div>
);

const FipPickers = () => (
	<div className="text-center">
		<strong>Output: </strong>
		<FontIconPicker
			icons={iconDefs.fontAwesome}
			onChange={noop}
			value="fas fa-subway"
			isMulti={false}
		/>
		<FontIconPicker
			icons={iconDefs.fontAwesome}
			onChange={noop}
			value={['fas fa-truck', 'fas fa-subway']}
			isMulti
		/>
	</div>
);

const FipAttribute = () => (
	<div className="text-center">
		<strong>Output: </strong>
		<FontIconPicker
			icons={iconDefs.icomoonIcons['Web Applications']}
			search={iconDefs.icomoonIconsSearch['Web Applications']}
			onChange={noop}
			value={[57436, 57437]}
			renderUsing="data-icomoon"
			isMulti
		/>
	</div>
);

const renderSVG = svg => (
	<svg>
		<use xlinkHref={`#${svg}`} />
	</svg>
);
const FipCustom = () => (
	<div className="text-center">
		<strong>Output: </strong>
		<FontIconPicker
			icons={iconDefs.svgs}
			onChange={noop}
			value={['004-green_lantern', '066-daredevil_glasses']}
			renderFunc={renderSVG}
			theme="indigo"
			isMulti
		/>
	</div>
);

const FipNCP = () => (
	<div className="fip-usage-ncp">
		<FipNoCategory />
		<ReactMarkdown
			source={fipncp}
			escapeHtml
			renderers={{
				code: codeRenderer,
			}}
		/>
	</div>
);
const FipCP = () => (
	<div className="fip-usage-cp">
		<FipCategory />
		<ReactMarkdown
			source={fipcp}
			escapeHtml
			renderers={{
				code: codeRenderer,
			}}
		/>
	</div>
);
const FipSMP = () => (
	<div className="fip-usage-smp">
		<FipPickers />
		<ReactMarkdown
			source={fipsmp}
			escapeHtml
			renderers={{
				code: codeRenderer,
			}}
		/>
	</div>
);
const FipAR = () => (
	<div className="fip-usage-ar">
		<FipAttribute />
		<ReactMarkdown
			source={fipar}
			escapeHtml
			renderers={{
				code: codeRenderer,
			}}
		/>
	</div>
);
const FipCR = () => (
	<div className="fip-usage-cr">
		<FipCustom />
		<ReactMarkdown
			source={fipcr}
			escapeHtml
			renderers={{
				code: codeRenderer,
			}}
		/>
	</div>
);

const links = {
	fipncp: {
		title: 'Non Categorized Picker',
		component: FipNCP,
		path: '',
	},
	fipcp: {
		title: 'Categorized Picker',
		component: FipCP,
		path: 'fip-non-categorized-picker/',
	},
	fipsmp: {
		title: 'Single/Multi Picker',
		component: FipSMP,
		path: 'fip-types-of-pickers/',
	},
	fipar: {
		title: 'Attribute Rendering',
		component: FipAR,
		path: 'fip-attribute-rendering/',
	},
	fipcr: {
		title: 'Custom Rendering SVG',
		component: FipCR,
		path: 'fip-custom-rendering/',
	},
};

const BasicUsage = () => (
	<div className="fip-usage">
		<ReactMarkdown
			source={basicusage}
			escapeHtml
			renderers={{
				code: codeRenderer,
			}}
		/>

		<h3>Examples with Code</h3>
		<hr />
		<nav className="nav nav-pills nav-justified">
			{Object.keys(links).map(key => (
				<NavLink
					key={key}
					to={`/basic-usage/${links[key].path}`}
					className="nav-link"
					activeClassName="active"
					exact
				>
					{links[key].title}
				</NavLink>
			))}
		</nav>
		<hr />
		<AnimatedSwitch
			atEnter={fadeInUp.atEnter}
			atLeave={fadeInUp.atLeave}
			atActive={fadeInUp.atActive}
			mapStyles={fadeInUp.mapStyles}
			className="usage-wrapper"
		>
			{Object.keys(links).map(key => (
				<Route
					key={key}
					path={`/basic-usage/${links[key].path}/`}
					component={links[key].component}
					exact
				/>
			))}
		</AnimatedSwitch>
	</div>
);

export default BasicUsage;
