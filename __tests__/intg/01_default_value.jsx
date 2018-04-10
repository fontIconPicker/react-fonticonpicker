// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FontIconPicker from '../../src/js/FontIconPicker';
import * as iconDefs from '../../src/docs/helpers/iconDefs';

// Check internal value conversion
describe('Default value', () => {
	describe('When Null Converts to', () => {
		test('string for single picker', () => {
			// callback to test the value
			const cb = jest.fn();
			shallow(
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					value={null}
					onChange={cb}
					isMulti={false}
					renderUsing="data-icomoon"
				/>,
			);
			// Check the initial value
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb.mock.calls[0][0]).toBe('');
		});
		test('array for multi picker', () => {
			// callback to test the value
			const cb = jest.fn();
			shallow(
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					value={null}
					onChange={cb}
					isMulti
					renderUsing="data-icomoon"
				/>,
			);
			// Check the initial value
			expect(cb).toHaveBeenCalledTimes(1);
			expect(Array.isArray(cb.mock.calls[0][0])).toBe(true);
			expect(cb.mock.calls[0][0]).toHaveLength(0);
		});
	});

	describe('When Not Null Converts to', () => {
		test('string for single picker', () => {
			// callback to test the value
			const cb = jest.fn();
			shallow(
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					value={['foo', 'bar']}
					onChange={cb}
					isMulti={false}
					renderUsing="data-icomoon"
				/>,
			);
			// Check the initial value
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb.mock.calls[0][0]).toBe('');
		});
		test('array for multi picker', () => {
			// callback to test the value
			const cb = jest.fn();
			shallow(
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					value="foo"
					onChange={cb}
					isMulti
					renderUsing="data-icomoon"
				/>,
			);
			// Check the initial value
			expect(cb).toHaveBeenCalledTimes(1);
			expect(Array.isArray(cb.mock.calls[0][0])).toBe(true);
			expect(cb.mock.calls[0][0]).toHaveLength(0);
		});
	});

	describe('Calls onChange on Parent', () => {
		test('for single picker', () => {
			const cb = jest.fn();
			shallow(
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					value={iconDefs.icomoonIcons['Other Icons'][0]}
					onChange={cb}
					isMulti={false}
					renderUsing="data-icomoon"
				/>,
			);
			// Check the initial value
			expect(cb).toHaveBeenCalledTimes(1);
		});
		test('for multi picker', () => {
			const cb = jest.fn();
			shallow(
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					value={iconDefs.icomoonIcons['Other Icons'][0]}
					onChange={cb}
					isMulti
					renderUsing="data-icomoon"
				/>,
			);
			// Check the initial value
			expect(cb).toHaveBeenCalledTimes(1);
		});
	});

	describe('Retains Correct Values', () => {
		test('for single picker', () => {
			const cb = jest.fn();
			const value = iconDefs.icomoonIcons['Other Icons'][0];
			shallow(
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					value={value}
					onChange={cb}
					isMulti={false}
					renderUsing="data-icomoon"
				/>,
			);
			// Check the initial value
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb.mock.calls[0][0]).toBe(value);
		});
		test('for multi picker', () => {
			const cb = jest.fn();
			const value = iconDefs.icomoonIcons['Other Icons'];
			shallow(
				<FontIconPicker
					icons={iconDefs.icomoonIcons}
					value={value}
					onChange={cb}
					isMulti
					renderUsing="data-icomoon"
				/>,
			);
			// Check the initial value
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb.mock.calls[0][0]).toEqual(value);
		});
	});
});
