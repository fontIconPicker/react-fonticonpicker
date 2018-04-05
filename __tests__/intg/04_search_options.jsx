// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import { mount } from 'enzyme';

import FontIconPicker from '../../src/js/FontIconPicker';
import FipButton from '../../src/js/components/FipButton';
import FipSearch from '../../src/js/components/FipSearch';
import * as iconDefs from '../../src/docs/helpers/iconDefs';

describe('Search Option', () => {
	test('shows up on showSearch', () => {
		const [valOne] = iconDefs.fontelloIcons.Others;
		const wrapper = mount(
			<FontIconPicker
				icons={iconDefs.fontelloIcons.Others}
				onChange={jest.fn()}
				isMulti={false}
				renderUsing="class"
				value={valOne}
				showSearch
			/>,
		);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.find(FipSearch)).toHaveLength(1);
	});
	test('does not show up without showSearch', () => {
		const [valOne] = iconDefs.fontelloIcons.Others;
		const wrapper = mount(
			<FontIconPicker
				icons={iconDefs.fontelloIcons.Others}
				onChange={jest.fn()}
				isMulti={false}
				renderUsing="class"
				value={valOne}
				showSearch={false}
			/>,
		);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.find(FipSearch)).toHaveLength(0);
	});
});
