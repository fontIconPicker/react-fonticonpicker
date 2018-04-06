// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FipDropDownPortal from '../../src/js/components/FipDropDownPortal';

describe('FipDropDownPortal Component', () => {
	const domNode = document.createElement('div');
	const btnNode = document.createElement('div');
	const props = {
		appendRoot: 'body',
		domRef: { current: domNode },
		btnRef: { current: btnNode },
		className: 'foo',
	};
	test('mounts to Node for valid DOM', () => {
		const wrapper = shallow(
			<FipDropDownPortal {...props}>
				<p>Foo</p>
			</FipDropDownPortal>,
		);
		expect(wrapper.state('appendRoot')).toBe(
			document.querySelector('body'),
		);
	});
	test('mounts to self for invalid DOM', () => {
		const newProps = {
			...props,
			appendRoot: false,
		};
		const wrapper = shallow(
			<FipDropDownPortal {...newProps}>
				<p>Foo</p>
			</FipDropDownPortal>,
		);
		expect(wrapper.state('appendRoot')).toBe('self');
	});
});
