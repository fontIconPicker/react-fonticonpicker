// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FipCategory from '../../src/js/components/FipCategory';

describe('FipCategory Component', () => {
	const cb = jest.fn();
	const props = {
		handleCategory: cb,
		value: 0,
		categories: ['foo', 'bar'],
	};
	const wrapper = shallow(<FipCategory {...props} />);
	test('renders select', () => {
		expect(wrapper.find('select.rfipcategory__select')).toHaveLength(1);
	});
	test('calls handleChange', () => {
		const event = {
			target: {
				value: 1,
			},
		};
		wrapper.find('select.rfipcategory__select').simulate('change', event);
		expect(cb).toHaveBeenLastCalledWith(event);
	});
});
