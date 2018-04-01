// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { flattenPossiblyCategorizedSource } from '../helpers/iconHelpers';
import FipButton from './FipButton';
import FipDropDown from './FipDropDown';
import FipDropDownPortal from './FipDropDownPortal';

class FontIconPicker extends React.PureComponent {
	static propTypes = {
		icons: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.arrayOf(PropTypes.string),
		]).isRequired,
		search: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.arrayOf(PropTypes.string),
		]),
		iconsPerPage: PropTypes.number,
		maxColumnsPerPage: PropTypes.number,
		theme: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		showCategory: PropTypes.bool,
		showSearch: PropTypes.bool,
		emptyValue: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.number,
			PropTypes.string,
		]),
		value: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number),
			PropTypes.number,
			PropTypes.string,
		]),
		isMulti: PropTypes.bool,
		renderer: PropTypes.func,
		appendTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		currentPage: PropTypes.number,
	};

	static defaultProps = {
		search: null,
		iconsPerPage: 20,
		maxColumnsPerPage: 5,
		theme: 'default',
		showCategory: true,
		showSearch: true,
		emptyValue: '',
		value: '',
		isMulti: true,
		renderer: null,
		appendTo: false,
		currentPage: 0,
	};

	constructor(props) {
		// Call the super
		super(props);
		// create the flattened icons, search and category
		const flattenedSource = flattenPossiblyCategorizedSource(
			this.props.icons,
		);
		const { categories, flattened: icons } = flattenedSource;
		const searchSource =
			this.props.search === null
				? [...icons]
				: flattenPossiblyCategorizedSource(this.props.search).flattened;
		// the class (BEM)
		const parentClassNames = className(
			// block
			'rfip',
			// modifier
			// 1. theme
			`rfip--theme-${this.props.theme}`,
		);

		// current value
		let { value } = this.props;
		const { emptyValue } = this.props;
		if (!value) {
			value = emptyValue;
		}
		// current page
		const { currentPage } = this.props;

		// create the state
		this.state = {
			icons,
			searchSource,
			categories,
			currentPage,
			elemClass: parentClassNames,
			isOpen: false,
			value,
		};
	}

	/**
	 * Handle the dropdown open thingy.
	 *
	 * Toggle the state isOpen and rest is done by React.
	 */
	handleOpen = () => {
		// create a copy of the state being modified
		// with the toggled value
		const isOpen = !this.state.isOpen;
		this.setState({ isOpen });
	};

	/**
	 * Handle page change for dropdown
	 *
	 * We save it in the state for the root component
	 * because we would restore the DOM to the previous position when
	 * being reopened.
	 */
	handleChangePage = newPage => {
		this.setState({ currentPage: newPage });
	};

	render() {
		// extract props for FipDropDown
		const {
			icons,
			searchSource,
			categories,
			value,
			currentPage,
		} = this.state;
		const {
			showCategory,
			showSearch,
			iconsPerPage,
			maxColumnsPerPage,
		} = this.props;
		// store in an object to spread later
		const dropDownProps = {
			icons,
			searchSource,
			categories,
			value,
			currentPage,
			iconsPerPage,
			maxColumnsPerPage,
			showCategory,
			showSearch,
		};
		return (
			<div className={this.state.elemClass}>
				<FipButton toggleDropDown={this.handleOpen} />
				{this.state.isOpen ? (
					<FipDropDownPortal appendRoot={this.props.appendTo}>
						<FipDropDown {...dropDownProps} />
					</FipDropDownPortal>
				) : null}
			</div>
		);
	}
}

export default FontIconPicker;
