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

class FontIconPicker extends React.PureComponent {
	static propTypes = {
		icons: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array,
		]).isRequired,
		search: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array,
		]),
		iconsPerPage: PropTypes.number,
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
			PropTypes.array,
			PropTypes.number,
			PropTypes.string,
		]),
		isMulti: PropTypes.bool,
		renderer: PropTypes.func,
	};

	static defaultProps = {
		search: [],
		iconsPerPage: 20,
		theme: 'default',
		showCategory: true,
		showSearch: true,
		emptyValue: '',
		value: '',
		isMulti: true,
		renderer: null,
	};

	constructor(props) {
		// Call the super
		super(props);
		// create the flattened icons, search and category
		const flattenedSource = flattenPossiblyCategorizedSource(this.props.icons);
		const { categories, flattened: icons } = flattenedSource;
		const searchSource = flattenPossiblyCategorizedSource(this.props.search).flattened;
		// the class (BEM)
		const parentClassNames = className(
			// block
			'rfip',
			// modifier
			// 1. theme
			`rfip--theme-${this.props.theme}`
		);

		// current value
		let { value } = this.props;
		const { emptyValue } = this.props;
		if ( ! value ) {
			value = emptyValue;
		}

		// create the state
		this.state = {
			icons,
			searchSource,
			categories,
			currentPage: 0,
			elemClass: parentClassNames,
			isOpen: false,
			value,
		};
	}

	handleOpen = () => {
		// create a copy of the state being modified
		// with the toggled value
		const isOpen = ! this.state.isOpen;
		this.setState({ isOpen });
	}

	render() {
		return (
			<div className={this.state.elemClass}>
				<FipButton toggleDropDown={this.handleOpen} />
				{(this.state.isOpen) ? <FipDropDown /> : null }
			</div>
		);
	}
}

export default FontIconPicker;
