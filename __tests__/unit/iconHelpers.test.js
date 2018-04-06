// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as iconHelpers from '../../src/js/helpers/iconHelpers';

describe('flattenPossiblyCategorizedSource', () => {
	test('is a pure function', () => {
		const source = {
			Foo: [1, 2, 3],
			Bar: [4, 5, 6],
		};
		const result = iconHelpers.flattenPossiblyCategorizedSource(
			source,
			'Foo',
		);
		source.Foo = ['a', 'b', 'c'];
		expect(result).toEqual([1, 2, 3]);
	});
	test('returns a copy of array', () => {
		const source = ['foo', 'bar'];
		expect(iconHelpers.flattenPossiblyCategorizedSource(source)).toEqual(
			source,
		);
	});
	test('returns full flattened object for null category', () => {
		const source = {
			Foo: [0, 1, 2],
			Bar: [3, 4, 5],
		};
		expect(
			iconHelpers.flattenPossiblyCategorizedSource(source, null),
		).toEqual([0, 1, 2, 3, 4, 5]);
	});
	test('returns scoped source for category', () => {
		const source = {
			Foo: [0, 1, 2],
			Bar: [3, 4, 5],
		};
		expect(
			iconHelpers.flattenPossiblyCategorizedSource(source, 'Foo'),
		).toEqual([0, 1, 2]);
	});
	test('returns empty array when category not found', () => {
		const source = {
			Foo: [0, 1, 2],
			Bar: [3, 4, 5],
		};
		expect(
			iconHelpers.flattenPossiblyCategorizedSource(source, 'FooBar'),
		).toHaveLength(0);
	});
});

describe('getPossibleCategories', () => {
	test('returns null if source is array', () => {
		const source = ['foo', 'bar'];
		expect(iconHelpers.getPossibleCategories(source)).toBeNull();
	});
	test('returns object keys as an array', () => {
		const source = {
			Foo: 'a',
			Bar: 'b',
		};
		expect(iconHelpers.getPossibleCategories(source)).toEqual([
			'Foo',
			'Bar',
		]);
	});
});

describe('convertToHex', () => {
	const expected = String.fromCodePoint(65);
	test('converts number to code point', () => {
		expect(iconHelpers.convertToHex(65)).toBe(expected);
	});
	test('converts string to code point', () => {
		expect(iconHelpers.convertToHex('65')).toBe(expected);
	});
});

describe('isArrayEqual', () => {
	test('tackles non arrays', () => {
		expect(iconHelpers.isArrayEqual('foo', ['a'])).toBeFalsy();
	});
	test('tackles random ordered arrays', () => {
		expect(
			iconHelpers.isArrayEqual(['Foo', 'Bar'], ['Bar', 'Foo']),
		).toBeTruthy();
	});
	test('returns false when arrays not equal', () => {
		expect(
			iconHelpers.isArrayEqual(['foo', 'bar'], ['foo', 'notbar']),
		).toBeFalsy();
	});
});

describe('getSourceType', () => {
	test('returns null for null', () => {
		expect(iconHelpers.getSourceType(null)).toBe('null');
	});
	test('returns array for array', () => {
		expect(iconHelpers.getSourceType([])).toBe('array');
	});
	test('returns object for object', () => {
		expect(iconHelpers.getSourceType({})).toBe('object');
	});
	test('returns number for number', () => {
		expect(iconHelpers.getSourceType(1.1)).toBe('number');
	});
	test('returns string for string', () => {
		expect(iconHelpers.getSourceType('foo')).toBe('string');
	});
});

describe('InvalidSourceException', () => {
	test('instantiates with proper variables', () => {
		const err = new iconHelpers.InvalidSourceException('array', 'object');
		expect(err.toString()).toBe(
			'Invalid Source Exception: Expected of type: object, found: array',
		);
	});
});
