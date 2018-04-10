// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
const routes = [
	{
		path: '/',
		component: 'Introduction',
		menu: 'Introduction',
		exact: true,
	},
	{
		path: '/installation/',
		component: 'Installation',
		menu: 'Installation',
		exact: true,
	},
	{
		link: '/basic-usage/',
		path: '/basic-usage/:partId?',
		component: 'BasicUsage',
		menu: 'Usage Guide',
	},
	{
		path: '/examples/',
		component: 'Examples',
		menu: 'Live Examples',
		exact: true,
	},
	{
		path: '/themes/',
		component: 'Themes',
		menu: 'Built-in Themes',
		exact: true,
	},
	{
		path: '/props/',
		component: 'Props',
		menu: 'Available Props',
		exact: true,
	},
	{
		path: '/meta/',
		component: 'Meta',
		menu: 'Contrib & Credit',
		exact: true,
	},
];

export default routes;
