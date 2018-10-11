// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import { mount } from 'enzyme';

import FontIconPicker from '../../src/js/FontIconPicker';
import FipButton from '../../src/js/components/FipButton';
import * as iconDefs from '../../src/docs/helpers/iconDefs';

describe('Clicking Icons', () => {
	const {
		Others: [valOne, valTwo, valThree, valFour],
	} = iconDefs.fontelloIcons;
	const props = {
		icons: iconDefs.fontelloIcons.Others,
		onChange: jest.fn(),
		isMulti: false,
		renderUsing: 'class',
		value: valOne,
		showCateogry: true,
	};
	const clickerSelector = '.rfipicons__ibox';
	test('toggles value on single select', () => {
		const wrapper = mount(<FontIconPicker {...props} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.state('value')).toBe(valOne);
		wrapper
			.find(clickerSelector)
			.at(0)
			.simulate('click');
		expect(wrapper.state('value')).toBe('');
		wrapper
			.find(clickerSelector)
			.at(1)
			.simulate('click');
		expect(wrapper.state('value')).toBe(valTwo);
	});
	test('toggles value on multi select', () => {
		const wrapper = mount(
			<FontIconPicker
				{...{ ...props, isMulti: true, value: [valOne, valTwo] }}
			/>,
		);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.state('value')).toEqual([valOne, valTwo]);
		wrapper
			.find(clickerSelector)
			.at(0)
			.simulate('click');
		expect(wrapper.state('value')).toEqual([valTwo]);
		wrapper
			.find(clickerSelector)
			.at(1)
			.simulate('click');
		expect(wrapper.state('value')).toHaveLength(0);
		wrapper
			.find(clickerSelector)
			.at(2)
			.simulate('click');
		expect(wrapper.state('value')).toEqual([valThree]);
		wrapper
			.find(clickerSelector)
			.at(3)
			.simulate('click');
		expect(wrapper.state('value')).toEqual([valThree, valFour]);
		wrapper
			.find(clickerSelector)
			.at(2)
			.simulate('click');
		expect(wrapper.state('value')).toEqual([valFour]);
	});
	test('expect dropdown to stay open after selecting icon when closeOnSelect is false', () => {
		const thisProps = {
			...props,
			closeOnSelect: false,
		};
		const wrapper = mount(<FontIconPicker {...thisProps} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.state('isOpen')).toBe(true);
		wrapper
			.find(clickerSelector)
			.at(0)
			.simulate('click');
		expect(wrapper.state('isOpen')).toBe(true);
	});
	test('expect dropdown to close after selecting icon when closeOnSelect is false', () => {
		const thisProps = {
			...props,
			closeOnSelect: true,
		};
		const wrapper = mount(<FontIconPicker {...thisProps} />);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.state('isOpen')).toBe(true);
		wrapper
			.find(clickerSelector)
			.at(0)
			.simulate('click');
		expect(wrapper.state('isOpen')).toBe(false);
	});
});
