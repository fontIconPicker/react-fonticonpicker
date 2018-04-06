// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { mount } from 'enzyme';

import FontIconPicker from '../../src/js/components/FontIconPicker';
import FipButton from '../../src/js/components/FipButton';

const icons = {
	'Web Applications': [
		57436,
		57437,
		57438,
		57439,
		57524,
		57525,
		57526,
		57527,
		57528,
		57531,
		57532,
		57533,
		57534,
		57535,
		57536,
		57537,
		57541,
		57545,
		57691,
		57692,
	],
	'Business Icons': [
		57347,
		57348,
		57375,
		57376,
		57377,
		57379,
		57403,
		57406,
		57432,
		57433,
		57434,
		57435,
		57450,
		57453,
		57456,
		57458,
		57460,
		57461,
		57463,
	],
};
const iconSearch = {
	'Web Applications': [
		'Box add',
		'Box remove',
		'Download',
		'Upload',
		'List',
		'List 2',
		'Numbered list',
		'Menu',
		'Menu 2',
		'Cloud download',
		'Cloud upload',
		'Download 2',
		'Upload 2',
		'Download 3',
		'Upload 3',
		'Globe',
		'Attachment',
		'Bookmark',
		'Embed',
		'Code',
	],
	'Business Icons': [
		'Office',
		'Newspaper',
		'Book',
		'Books',
		'Library',
		'Profile',
		'Support',
		'Address book',
		'Cabinet',
		'Drawer',
		'Drawer 2',
		'Drawer 3',
		'Bubble',
		'Bubble 2',
		'User',
		'User 2',
		'User 3',
		'User 4',
		'Busy',
	],
};
const changeMock = jest.fn();
const [valOne, valTwo] = icons['Business Icons'];
const propsDefault = {
	icons,
	search: iconSearch,
	theme: 'bluegrey',
	onChange: changeMock,
};
describe('Single Picker', () => {
	const propsMulti = {
		...propsDefault,
		isMulti: true,
		value: [valOne, valTwo],
	};
	test('With Category & Search', () => {
		const thisProps = {
			...propsMulti,
			showCategory: true,
			showSearch: true,
		};
		const wrapper = mount(<FontIconPicker {...thisProps} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper).toMatchSnapshot();
	});
	test('Without Category & With Search', () => {
		const thisProps = {
			...propsMulti,
			showCategory: false,
			showSearch: true,
		};
		const wrapper = mount(<FontIconPicker {...thisProps} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper).toMatchSnapshot();
	});
	test('Without Category & Search', () => {
		const thisProps = {
			...propsMulti,
			showCategory: false,
			showSearch: false,
		};
		const wrapper = mount(<FontIconPicker {...thisProps} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper).toMatchSnapshot();
	});
});
describe('Multi Picker', () => {
	const propsSingle = {
		...propsDefault,
		isMulti: false,
		value: valOne,
	};
	test('With Category & Search', () => {
		const thisProps = {
			...propsSingle,
			showCategory: true,
			showSearch: true,
		};
		const wrapper = mount(<FontIconPicker {...thisProps} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper).toMatchSnapshot();
	});
	test('Without Category & With Search', () => {
		const thisProps = {
			...propsSingle,
			showCategory: false,
			showSearch: true,
		};
		const wrapper = mount(<FontIconPicker {...thisProps} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper).toMatchSnapshot();
	});
	test('Without Category & Search', () => {
		const thisProps = {
			...propsSingle,
			showCategory: false,
			showSearch: false,
		};
		const wrapper = mount(<FontIconPicker {...thisProps} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper).toMatchSnapshot();
	});
});
