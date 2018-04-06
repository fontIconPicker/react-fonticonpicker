// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FipSearch from '../../src/js/components/FipSearch';

describe('FipSearch Component', () => {
	const cb = jest.fn();
	const props = {
		handleSearch: cb,
		value: 'foo',
		placeholder: 'bar',
	};
	const wrapper = shallow(<FipSearch {...props} />);
	test('renders input', () => {
		expect(wrapper.find('input.rfipsearch__input')).toHaveLength(1);
	});
	test('calls handleSearch', () => {
		const event = {
			target: {
				value: 'change of foo',
			},
		};
		wrapper.find('input').simulate('change', event);
		expect(cb).toHaveBeenLastCalledWith(event);
	});
});
