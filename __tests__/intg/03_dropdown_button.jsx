// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow, mount } from 'enzyme';

import FontIconPicker from '../../src/js/FontIconPicker';
import FipButton from '../../src/js/components/FipButton';
import * as iconDefs from '../../src/docs/helpers/iconDefs';

describe('Clicking Button', () => {
	test('changes class', () => {
		// Just a callback
		const cb = () => null;
		const wrapper = shallow(
			<FontIconPicker icons={iconDefs.icomoonIcons} onChange={cb} />,
		);
		expect(
			wrapper.find(FipButton).hasClass('rfipbtn--open'),
		).not.toBeTruthy();
		expect(wrapper.find(FipButton).hasClass('rfipbtn--close')).toBeTruthy();
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.find(FipButton).hasClass('rfipbtn--open')).toBeTruthy();
		expect(
			wrapper.find(FipButton).hasClass('rfipbtn--close'),
		).not.toBeTruthy();
	});

	test('mounts portal', () => {
		const cb = () => null;
		const wrapper = shallow(
			<FontIconPicker
				icons={iconDefs.icomoonIcons.Devices}
				onChange={cb}
				renderUsing="data-icomoon"
			/>,
		);
		expect(wrapper.render().find('.rfipdropdown')).toHaveLength(0);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.render().find('.rfipdropdown')).toHaveLength(1);
	});

	test('unmounts portal on double click', () => {
		const cb = () => null;
		const wrapper = shallow(
			<FontIconPicker
				icons={iconDefs.icomoonIcons.Devices}
				onChange={cb}
				renderUsing="data-icomoon"
			/>,
		);
		expect(wrapper.render().find('.rfipdropdown')).toHaveLength(0);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.render().find('.rfipdropdown')).toHaveLength(1);
		wrapper.find(FipButton).simulate('click');
		expect(wrapper.render().find('.rfipdropdown')).toHaveLength(0);
	});
});

// Check delete on dropdown button
describe('Clicking Delete', () => {
	describe('On Multi Picker', () => {
		test('deletes from value array', () => {
			const [valOne, valTwo] = iconDefs.fontelloIcons.Others;
			const wrapper = mount(
				<FontIconPicker
					icons={iconDefs.fontelloIcons.Others}
					onChange={jest.fn()}
					isMulti
					renderUsing="class"
					value={[valOne, valTwo]}
				/>,
			);
			expect(wrapper.state('value')).toEqual([valOne, valTwo]);
			// Now delete
			wrapper
				.find('.rfipbtn__del')
				.at(0)
				.simulate('click');
			expect(wrapper.state('value')).toEqual([valTwo]);
		});
	});
	describe('On Single Picker', () => {
		test('sets value to empty string', () => {
			const [valOne] = iconDefs.fontelloIcons.Others;
			const wrapper = mount(
				<FontIconPicker
					icons={iconDefs.fontelloIcons.Others}
					onChange={jest.fn()}
					isMulti={false}
					renderUsing="class"
					value={valOne}
				/>,
			);
			expect(wrapper.state('value')).toBe(valOne);
			// Now delete
			wrapper
				.find('.rfipbtn__del')
				.at(0)
				.simulate('click');
			expect(wrapper.state('value')).toBe('');
		});
	});
});
