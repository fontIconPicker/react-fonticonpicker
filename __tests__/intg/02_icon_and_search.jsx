// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FontIconPicker from '../../src/js/FontIconPicker';
import FipIconContainer from '../../src/js/components/FipIconContainer';
import * as iconDefs from '../../src/docs/helpers/iconDefs';

describe('Icon & Search Source', () => {
	describe('In FontIconPicker Component', () => {
		test('get passed as props', () => {
			const icons = ['foo', 'bar'];
			const search = ['Foo', 'Bar'];
			const wrapper = shallow(
				<FontIconPicker
					icons={icons}
					search={search}
					onChange={jest.fn()}
					renderUsing="class"
				/>,
			);
			expect(wrapper.instance().props.icons).toEqual(icons);
			expect(wrapper.instance().props.search).toEqual(search);
		});

		test('search can be null', () => {
			const icons = ['foo', 'bar'];
			const wrapper = shallow(
				<FontIconPicker
					icons={icons}
					search={null}
					onChange={jest.fn()}
					renderUsing="class"
				/>,
			);
			expect(wrapper.instance().props.icons).toEqual(icons);
			expect(wrapper.instance().props.search).toBe(null);
		});
	});

	describe('In FontIconContainer Component', () => {
		test('icons populate search if null', () => {
			const icons = ['foo', 'bar'];
			const props = {
				categories: null,
				currentCategory: null,
				isMulti: false,
				icons,
				search: null,
				value: '',
				currentSearch: '',
				handleChangeValue: jest.fn(),
				currentPage: 0,
				iconsPerPage: 20,
				handleChangePage: jest.fn(),
				renderIcon: jest.fn(),
				noIconPlaceholder: '',
			};
			const wrapper = shallow(<FipIconContainer {...props} />);
			expect(wrapper.state('iconView')).toEqual(icons);
			expect(wrapper.state('titleView')).toEqual(icons);
		});
	});
});
