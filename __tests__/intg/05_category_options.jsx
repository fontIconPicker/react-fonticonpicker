// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import { mount } from 'enzyme';

import FontIconPicker from '../../src/js/FontIconPicker';
import FipButton from '../../src/js/components/FipButton';
import FipCategory from '../../src/js/components/FipCategory';
import * as iconDefs from '../../src/docs/helpers/iconDefs';

describe('Category Option', () => {
	test('shows up on showCateogry', () => {
		const { Others: [valOne] } = iconDefs.fontelloIcons;
		const wrapper = mount(
			<FontIconPicker
				icons={iconDefs.fontelloIcons}
				onChange={jest.fn()}
				isMulti={false}
				renderUsing="class"
				value={valOne}
				showCateogry
			/>,
		);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.find(FipCategory)).toHaveLength(1);
	});
	test('does not show up without categorized source', () => {
		const [valOne] = iconDefs.fontelloIcons.Others;
		const wrapper = mount(
			<FontIconPicker
				icons={iconDefs.fontelloIcons.Others}
				onChange={jest.fn()}
				isMulti={false}
				renderUsing="class"
				value={valOne}
				showCateogry
			/>,
		);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.find(FipCategory)).toHaveLength(0);
	});
});
