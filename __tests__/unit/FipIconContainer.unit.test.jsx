// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { shallow } from 'enzyme';

import FipIconContainer from '../../src/js/components/FipIconContainer';
import * as iconDefs from '../../src/docs/helpers/iconDefs';
import { InvalidSourceException } from '../../src/js/helpers/iconHelpers';

const propsForMulti = {
	categories: ['Show all categories', ...Object.keys(iconDefs.icomoonIcons)],
	currentCategory: 0,
	isMulti: true,
	icons: iconDefs.icomoonIcons,
	search: iconDefs.icomoonIconsSearch,
	value: [
		iconDefs.icomoonIcons['Other Icons'][0],
		iconDefs.icomoonIcons['Social and Networking'][0],
	],
	currentSearch: '',
	currentPage: 0,
	iconsPerPage: 20,
	noIconPlaceholder: 'no icons',
	handleChangePage: jest.fn(),
	renderIcon: jest.fn(),
	handleChangeValue: jest.fn(),
};
const propsForSingle = {
	...propsForMulti,
	isMulti: false,
	value: iconDefs.icomoonIcons['Social and Networking'][0],
};
const propsForNoCategory = {
	...propsForSingle,
	categories: null,
	currentCategory: null,
	icons: iconDefs.icomoonIcons['Other Icons'],
	search: iconDefs.icomoonIconsSearch['Other Icons'],
};
const iconDefsKeys = Object.keys(iconDefs.icomoonIconsSearch);

describe('FipIconContainer Component', () => {
	describe('For Empty Search Source', () => {
		const props = { ...propsForNoCategory, search: null };
		const wrapper = shallow(<FipIconContainer {...props} />);
		test('titleView populates from icons', () => {
			expect(props.icons).toEqual(
				expect.arrayContaining(wrapper.state('titleView')),
			);
		});
		test('iconView populates from icons', () => {
			expect(props.icons).toEqual(
				expect.arrayContaining(wrapper.state('iconView')),
			);
		});
	});

	describe('For Non Emtpy Search Source', () => {
		const props = { ...propsForNoCategory };
		const wrapper = shallow(<FipIconContainer {...props} />);
		test('titleView populates from search', () => {
			expect(props.icons).not.toEqual(
				expect.arrayContaining(wrapper.state('titleView')),
			);
			expect(props.search).toEqual(
				expect.arrayContaining(wrapper.state('titleView')),
			);
		});
		test('iconView populates from icons', () => {
			expect(props.icons).toEqual(
				expect.arrayContaining(wrapper.state('iconView')),
			);
		});
	});

	// Test cases without category
	describe('When No Categories Supplied', () => {
		describe('For Uncategorized Source', () => {
			describe('For Single Picker', () => {
				const props = {
					...propsForNoCategory,
				};
				const wrapper = shallow(<FipIconContainer {...props} />);
				test('iconView populates from currentCategory', () => {
					expect(iconDefs.icomoonIcons['Other Icons']).toEqual(
						expect.arrayContaining(wrapper.state('iconView')),
					);
				});
				test('titleView populates from currentCategory', () => {
					expect(iconDefs.icomoonIconsSearch['Other Icons']).toEqual(
						expect.arrayContaining(wrapper.state('titleView')),
					);
				});
			});
			describe('For Multi Picker', () => {
				const props = {
					...propsForMulti,
					categories: null,
					currentCategory: null,
					icons: iconDefs.icomoonIcons['Other Icons'],
					search: iconDefs.icomoonIconsSearch['Other Icons'],
				};
				const wrapper = shallow(<FipIconContainer {...props} />);
				test('iconView populates from currentCategory', () => {
					expect(iconDefs.icomoonIcons['Other Icons']).toEqual(
						expect.arrayContaining(wrapper.state('iconView')),
					);
				});
				test('titleView populates from currentCategory', () => {
					expect(iconDefs.icomoonIconsSearch['Other Icons']).toEqual(
						expect.arrayContaining(wrapper.state('titleView')),
					);
				});
			});
		});
		describe('For Categorized Source', () => {
			const props = {
				...propsForNoCategory,
				icons: iconDefs.icomoonIcons,
				search: iconDefs.icomoonIconsSearch,
				currentCategory: 1,
			};
			function makeError() {
				shallow(<FipIconContainer {...props} />);
			}
			test('it throws exception', () => {
				expect(makeError).toThrow(InvalidSourceException);
			});
		});
	});

	// Test cases with category
	describe('When Categories Supplied', () => {
		describe('For Categorized Source', () => {
			describe('For Single Picker', () => {
				const props = {
					...propsForSingle,
					currentCategory: 2,
				};
				const wrapper = shallow(<FipIconContainer {...props} />);
				test('iconView populates from currentCategory', () => {
					expect(iconDefs.icomoonIcons[iconDefsKeys[1]]).toEqual(
						expect.arrayContaining(wrapper.state('iconView')),
					);
				});
				test('titleView populates from currentCategory', () => {
					expect(
						iconDefs.icomoonIconsSearch[iconDefsKeys[1]],
					).toEqual(
						expect.arrayContaining(wrapper.state('titleView')),
					);
				});
			});
			describe('For Multi Picker', () => {
				const props = {
					...propsForMulti,
					currentCategory: 2,
				};
				const wrapper = shallow(<FipIconContainer {...props} />);
				test('iconView populates from currentCategory', () => {
					expect(iconDefs.icomoonIcons[iconDefsKeys[1]]).toEqual(
						expect.arrayContaining(wrapper.state('iconView')),
					);
				});
				test('titleView populates from currentCategory', () => {
					expect(
						iconDefs.icomoonIconsSearch[iconDefsKeys[1]],
					).toEqual(
						expect.arrayContaining(wrapper.state('titleView')),
					);
				});
			});
		});
		describe('For Non Categorized Source', () => {
			const props = {
				...propsForSingle,
				currentCategory: 2,
				icons: iconDefs.icomoonIcons['Other Icons'],
				search: iconDefs.icomoonIconsSearch['Other Icons'],
			};
			function makeError() {
				shallow(<FipIconContainer {...props} />);
			}
			test('it throws exception', () => {
				expect(makeError).toThrow(InvalidSourceException);
			});
		});
	});

	describe('With Search String', () => {
		describe('When Search String Supplied', () => {
			test('it shows icons fuzzy matching search', () => {
				const props = { ...propsForMulti, currentSearch: 'Flip' };
				const wrapper = shallow(<FipIconContainer {...props} />);
				expect(wrapper.state('iconView')).toEqual(
					expect.arrayContaining([57444, 57445]),
				);
				expect(wrapper.state('titleView')).toEqual(
					expect.arrayContaining(['Flip', 'Flip 2']),
				);
			});
		});
		describe('When Search String is empty', () => {
			test('it shows all icons', () => {
				const props = { ...propsForNoCategory, currentSearch: '' };
				const wrapper = shallow(<FipIconContainer {...props} />);
				expect(iconDefs.icomoonIcons['Other Icons']).toEqual(
					expect.arrayContaining(wrapper.state('iconView')),
				);
				expect(iconDefs.icomoonIconsSearch['Other Icons']).toEqual(
					expect.arrayContaining(wrapper.state('titleView')),
				);
			});
		});
		describe('When Search String Does Not Match', () => {
			test('it shows noIconPlaceHolder', () => {
				const props = {
					...propsForNoCategory,
					currentSearch: 'foo is not here.. Bla',
				};
				const wrapper = shallow(<FipIconContainer {...props} />);
				expect(wrapper.contains(props.noIconPlaceholder)).toBeTruthy();
				wrapper.setProps({ currentSearch: '' });
				expect(
					wrapper.contains(props.noIconPlaceholder),
				).not.toBeTruthy();
			});
		});
	});

	describe('With Pagination', () => {
		test('it shows iconsPerPage number of icons', () => {
			const props = { ...propsForMulti, iconsPerPage: 50 };
			const wrapper = shallow(<FipIconContainer {...props} />);
			expect(wrapper.state('iconView')).toHaveLength(50);
			expect(wrapper.state('titleView')).toHaveLength(50);
		});
		test('calls handleChangePage on page change', () => {
			const cb = jest.fn();
			const props = {
				...propsForMulti,
				iconsPerPage: 10,
				handleChangePage: cb,
			};
			const wrapper = shallow(<FipIconContainer {...props} />);
			wrapper.find('.rfipicons__right').simulate('click');
			expect(cb).toHaveBeenCalledTimes(1);
			expect(cb).toHaveBeenLastCalledWith(1);
			wrapper.setProps({ currentPage: 1 });
			wrapper.find('.rfipicons__left').simulate('click');
			expect(cb).toHaveBeenCalledTimes(2);
			expect(cb).toHaveBeenLastCalledWith(0);
		});
		test('shows icons depending on currentPage', () => {
			const props = {
				...propsForNoCategory,
				iconsPerPage: 10,
				currentPage: 2,
			};
			const wrapper = shallow(<FipIconContainer {...props} />);
			const expectedIcons = iconDefs.icomoonIcons['Other Icons'].slice(
				20,
				30,
			);
			const expectedTitles = iconDefs.icomoonIconsSearch[
				'Other Icons'
			].slice(20, 30);
			expect(wrapper.state('iconView')).toEqual(
				expect.arrayContaining(expectedIcons),
			);
			expect(wrapper.state('titleView')).toEqual(
				expect.arrayContaining(expectedTitles),
			);
		});
		describe('Pagination Buttons', () => {
			test('does not show left on first page', () => {
				const props = { ...propsForMulti, iconsPerPage: 50 };
				const wrapper = shallow(<FipIconContainer {...props} />);
				expect(wrapper.find('.rfipicons__left')).toHaveLength(0);
				expect(wrapper.find('.rfipicons__right')).toHaveLength(1);
			});
			test('does not show right on last page', () => {
				const props = { ...propsForMulti, iconsPerPage: 50 };
				const wrapper = shallow(<FipIconContainer {...props} />);
				const totalPage = wrapper.state('totalPage');
				wrapper.setProps({ currentPage: totalPage });
				expect(wrapper.find('.rfipicons__left')).toHaveLength(1);
				expect(wrapper.find('.rfipicons__right')).toHaveLength(0);
			});
			describe('On Click', () => {
				test('sets viewPage State', () => {
					const props = { ...propsForMulti, iconsPerPage: 50 };
					const wrapper = shallow(<FipIconContainer {...props} />);
					expect(wrapper.state('viewPage')).toBe(1);
					wrapper.find('.rfipicons__right').simulate('click');
					expect(wrapper.state('viewPage')).toBe(2);
					wrapper.setProps({ currentPage: 1 });
					wrapper.find('.rfipicons__left').simulate('click');
					expect(wrapper.state('viewPage')).toBe(1);
				});
			});
			describe('On KeyDown', () => {
				test('sets viewPage State', () => {
					const props = { ...propsForMulti, iconsPerPage: 50 };
					const wrapper = shallow(<FipIconContainer {...props} />);
					expect(wrapper.state('viewPage')).toBe(1);
					wrapper
						.find('.rfipicons__right')
						.simulate('keydown', { keyCode: 13 });
					expect(wrapper.state('viewPage')).toBe(2);
					wrapper.setProps({ currentPage: 1 });
					wrapper
						.find('.rfipicons__left')
						.simulate('keydown', { keyCode: 32 });
					expect(wrapper.state('viewPage')).toBe(1);
					wrapper
						.find('.rfipicons__right')
						.simulate('keydown', { keyCode: 65 });
					expect(wrapper.state('viewPage')).not.toBe(2);
				});
			});
		});
		describe('Page Input', () => {
			const cb = jest.fn();
			const props = {
				...propsForMulti,
				iconsPerPage: 10,
				handleChangePage: cb,
			};
			const wrapper = shallow(<FipIconContainer {...props} />);
			const totalPage = wrapper.state('totalPage');

			test('listens to page input', () => {
				wrapper
					.find('.rfipicons__cp')
					.simulate('change', { target: { value: 2 } });
				expect(cb).toHaveBeenCalledTimes(1);
				expect(cb).toHaveBeenLastCalledWith(1);
			});
			test('corrects invalid number input', () => {
				wrapper
					.find('.rfipicons__cp')
					.simulate('change', { target: { value: 'foo' } });
				expect(cb).toHaveBeenLastCalledWith(0);
			});
			test('corrects greater number input', () => {
				wrapper
					.find('.rfipicons__cp')
					.simulate('change', { target: { value: totalPage + 10 } });
				expect(cb).toHaveBeenLastCalledWith(totalPage - 1);
			});
			test('correct lesser number input', () => {
				wrapper
					.find('.rfipicons__cp')
					.simulate('change', { target: { value: -2 } });
				expect(cb).toHaveBeenLastCalledWith(0);
			});
			test('sets viewPage State', () => {
				wrapper
					.find('.rfipicons__cp')
					.simulate('change', { target: { value: totalPage - 2 } });
				expect(cb).toHaveBeenLastCalledWith(totalPage - 3);
				expect(wrapper.state('viewPage')).toBe(totalPage - 2);
			});
			test('corrects empty string in sync with state', () => {
				wrapper
					.find('.rfipicons__cp')
					.simulate('change', { target: { value: '' } });
				expect(cb).toHaveBeenLastCalledWith(0);
				expect(wrapper.state('viewPage')).toBe('');
			});
		});
	});

	describe('Icon Selector', () => {
		const cb = jest.fn();
		const props = {
			...propsForNoCategory,
			handleChangeValue: cb,
			iconsPerPage: iconDefs.icomoonIcons['Other Icons'].length,
		};
		const wrapper = shallow(<FipIconContainer {...props} />);
		test('calls handleChangeValue', () => {
			wrapper
				.find('.rfipicons__ibox')
				.at(0)
				.simulate('click');
			expect(cb).toHaveBeenCalledTimes(1);
		});
		test('responds on click', () => {
			wrapper
				.find('.rfipicons__ibox')
				.at(11)
				.simulate('click');
			expect(cb).toHaveBeenLastCalledWith(
				iconDefs.icomoonIcons['Other Icons'][11],
			);
		});
		test('responds keydown', () => {
			wrapper
				.find('.rfipicons__ibox')
				.at(12)
				.simulate('keydown', { keyCode: 13 });
			expect(cb).toHaveBeenLastCalledWith(
				iconDefs.icomoonIcons['Other Icons'][12],
			);
			wrapper
				.find('.rfipicons__ibox')
				.at(14)
				.simulate('keydown', { keyCode: 32 });
			expect(cb).toHaveBeenLastCalledWith(
				iconDefs.icomoonIcons['Other Icons'][14],
			);
			const newCB = jest.fn();
			wrapper.setProps({ handleChangeValue: newCB });
			wrapper
				.find('.rfipicons__ibox')
				.at(13)
				.simulate('keydown', { keyCode: 65 });
			expect(newCB).not.toHaveBeenCalled();
		});
	});
});
