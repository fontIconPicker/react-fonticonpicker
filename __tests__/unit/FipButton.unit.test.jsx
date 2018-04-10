// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FipButton from '../../src/js/components/FipButton';

describe('FipButton Component', () => {
	const handleDeleteValueCB = jest.fn();
	const onClickCB = jest.fn();
	const props = {
		className: 'foo',
		isOpen: true,
		onClick: onClickCB,
		domRef: React.createRef(),
		isMulti: true,
		value: ['foo', 'bar'],
		renderIcon: jest.fn(),
		handleDeleteValue: handleDeleteValueCB,
		noSelectedPlaceholder: 'foo',
	};
	const wrapper = shallow(<FipButton {...props} />);

	test('handles click', () => {
		wrapper.instance().handleClick();
		expect(onClickCB).toHaveBeenCalledTimes(1);
	});
	test('handles keydown', () => {
		wrapper.instance().handleKeyDown({ keyCode: 32 });
		expect(onClickCB).toHaveBeenCalledTimes(2);
	});
	test('handles delete on click', () => {
		const eventMock = { stopPropagation: jest.fn() };
		wrapper.instance().handleDelete(eventMock, 'foo');
		expect(eventMock.stopPropagation).toHaveBeenCalledTimes(1);
		expect(handleDeleteValueCB).toHaveBeenLastCalledWith('foo');
	});
	test('handles delete on keydown', () => {
		const newCB = jest.fn();
		wrapper.setProps({ handleDeleteValue: newCB });
		wrapper.instance().handleDeleteKeyboard({ keyCode: 32 });
		expect(newCB).toHaveBeenCalledTimes(1);
	});
});
