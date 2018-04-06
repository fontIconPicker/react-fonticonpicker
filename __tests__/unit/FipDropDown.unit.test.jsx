// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FipDropDown from '../../src/js/components/FipDropDown';
import * as iconDefs from '../../src/docs/helpers/iconDefs';

describe('FipDropDown Component', () => {
	const handleChangeCategoryCB = jest.fn();
	const handleChangePageCB = jest.fn();
	const handleChangeSearchCB = jest.fn();
	const props = {
		isMulti: false,
		value: 'foo',
		currentCategory: 0,
		currentPage: 0,
		currentSearch: '',
		icons: iconDefs.icomoonIcons['Other Icons'],
		search: iconDefs.icomoonIconsSearch['Other Icons'],
		showCategory: true,
		showSearch: true,
		iconsPerPage: 20,
		allCatPlaceholder: '',
		searchPlaceholder: '',
		noIconPlaceholder: '',
		renderIcon: jest.fn(),
		handleChangeValue: jest.fn(),
		handleChangeCategory: handleChangeCategoryCB,
		handleChangePage: handleChangePageCB,
		handleChangeSearch: handleChangeSearchCB,
	};
	const wrapper = shallow(<FipDropDown {...props} />);
	test('calls handleChangeCategory & handleChangePageCB on category update', () => {
		wrapper.instance().handleCategory({ target: { value: 1 } });
		expect(handleChangeCategoryCB).toHaveBeenCalledTimes(1);
		expect(handleChangeCategoryCB).toHaveBeenLastCalledWith(1);
		expect(handleChangePageCB).toHaveBeenCalledTimes(1);
		expect(handleChangePageCB).toHaveBeenLastCalledWith(0);
	});
	test('sets proper category on invalid input', () => {
		wrapper.instance().handleCategory({ target: { value: 'foo' } });
		expect(handleChangeCategoryCB).toHaveBeenLastCalledWith(0);
	});
	test('calls handleChangeSearch on search update', () => {
		wrapper.instance().handleSearch({ target: { value: 'foo' } });
		expect(handleChangeSearchCB).toHaveBeenCalledTimes(1);
		expect(handleChangeSearchCB).toHaveBeenLastCalledWith('foo');
	});
});
