// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FontIconPicker from '../../src/js/components/FontIconPicker';
import * as iconDefs from '../../src/docs/helpers/iconDefs';

describe('FontIconPicker Component', () => {
	const { Others: [valOne, valTwo] } = iconDefs.fontelloIcons;
	const onChangeCBSingle = jest.fn();
	const onChangeCBMulti = jest.fn();
	const propsMulti = {
		icons: iconDefs.fontelloIcons.Others,
		onChange: onChangeCBMulti,
		value: [valOne, valTwo],
		isMulti: true,
	};
	const propsSingle = {
		icons: iconDefs.fontelloIcons.Others,
		onChange: onChangeCBSingle,
		value: valOne,
		isMulti: false,
	};
	describe('On Single Picker Mode', () => {
		test('calls onChange on handleChangeValue', () => {
			const wrapper = shallow(<FontIconPicker {...propsSingle} />);
			wrapper.instance().handleChangeValue(valOne);
			expect(onChangeCBSingle).toHaveBeenLastCalledWith('');
			wrapper.instance().handleChangeValue(valTwo);
			expect(onChangeCBSingle).toHaveBeenLastCalledWith(valTwo);
		});
		test('calls onChange on handleDeleteValue', () => {
			const cb = jest.fn();
			const wrapper = shallow(
				<FontIconPicker {...{ ...propsSingle, onChange: cb }} />,
			);
			wrapper.instance().handleDeleteValue(valOne);
			expect(cb).toHaveBeenLastCalledWith('');
		});
	});
	describe('On Multi Picker Mode', () => {
		test('calls onChange on handleChangeValue', () => {
			const wrapper = shallow(<FontIconPicker {...propsMulti} />);
			wrapper.instance().handleChangeValue(valOne);
			expect(onChangeCBMulti).toHaveBeenLastCalledWith(
				expect.arrayContaining([valTwo]),
			);
			wrapper.instance().handleChangeValue(valTwo);
			expect(onChangeCBMulti).toHaveBeenLastCalledWith(
				expect.arrayContaining([]),
			);
		});
		test('calls onChange on handleDeleteValue', () => {
			const cb = jest.fn();
			const wrapper = shallow(
				<FontIconPicker {...{ ...propsMulti, onChange: cb }} />,
			);
			wrapper.instance().handleDeleteValue(valOne);
			expect(cb).toHaveBeenLastCalledWith(
				expect.arrayContaining([valTwo]),
			);
			wrapper.instance().handleDeleteValue(valTwo);
			expect(cb).toHaveBeenLastCalledWith(expect.arrayContaining([]));
		});
	});
	test('handleChangePage sets state currentPage', () => {
		const wrapper = shallow(<FontIconPicker {...propsSingle} />);
		wrapper.instance().handleChangePage(1);
		expect(wrapper.state('currentPage')).toBe(1);
	});
	test('handleChangeCategory sets state currentPage and currentCategory', () => {
		const wrapper = shallow(<FontIconPicker {...propsSingle} />);
		wrapper.instance().handleChangePage(2);
		expect(wrapper.state('currentPage')).toBe(2);
		wrapper.instance().handleChangeCategory(1);
		expect(wrapper.state('currentPage')).toBe(0);
		expect(wrapper.state('currentCategory')).toBe(1);
	});
	test('handleChangeSearch sets state currentPage and currentSearch', () => {
		const wrapper = shallow(<FontIconPicker {...propsSingle} />);
		wrapper.instance().handleChangePage(2);
		expect(wrapper.state('currentPage')).toBe(2);
		wrapper.instance().handleChangeSearch('foo');
		expect(wrapper.state('currentPage')).toBe(0);
		expect(wrapper.state('currentSearch')).toBe('foo');
	});
});
