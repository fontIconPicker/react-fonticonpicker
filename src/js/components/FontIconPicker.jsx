// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import FipButton from './FipButton';
import FipDropDown from './FipDropDown';
import FipDropDownPortal from './FipDropDownPortal';

class FontIconPicker extends React.PureComponent {
	static propTypes = {
		icons: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number),
			PropTypes.objectOf(
				PropTypes.oneOfType([
					PropTypes.arrayOf(PropTypes.number),
					PropTypes.arrayOf(PropTypes.string),
				]),
			),
		]).isRequired,
		search: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.arrayOf(PropTypes.string),
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
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number),
			PropTypes.number,
			PropTypes.string,
		]),
		isMulti: PropTypes.bool,
		renderer: PropTypes.func,
		appendTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		currentPage: PropTypes.number,
		allCatPlaceholder: PropTypes.string,
	};

	static defaultProps = {
		search: null,
		iconsPerPage: 20,
		theme: 'default',
		showCategory: true,
		showSearch: true,
		emptyValue: '',
		value: '',
		isMulti: true,
		renderer: null,
		appendTo: false,
		currentPage: 0,
		allCatPlaceholder: 'Show from all',
	};

	constructor(props) {
		// Call the super
		super(props);
		// some references we need for outside click
		this.fipButtonRef = React.createRef();
		this.fipDropDownRef = React.createRef();

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
			currentCategory: 0,
			currentPage,
			elemClass: parentClassNames,
			isOpen: false,
			value,
			currentSearch: '',
		};
	}

	componentWillMount() {
		const events = ['mousedown', 'touchend'];
		events.forEach(value => {
			document.addEventListener(value, this.handleOuterClick, false);
		});
	}

	componentWillUnmount() {
		const events = ['mousedown', 'touchend'];
		events.forEach(value => {
			document.removeEventListener(value, this.handleOuterClick, false);
		});
	}

	/**
	 * Handle the outer click event
	 * It checks if event came from outside
	 * If so, then close the dropdown
	 */
	handleOuterClick = event => {
		const { target } = event;
		// is it inner?
		if (
			this.fipButtonRef.current.contains(target) ||
			(this.fipDropDownRef.current &&
				this.fipDropDownRef.current.contains(target))
		) {
			// then don't do anything
			return;
		}
		// toggle the dropdown
		this.setState({ isOpen: false });
	};

	/**
	 * Handle the dropdown open thingy.
	 *
	 * Toggle the state isOpen and rest is done by React.
	 */
	handleToggle = () => {
		// create a copy of the state being modified
		// with the toggled value
		const isOpen = !this.state.isOpen;
		this.setState({ isOpen });
	};

	/**
	 * Handle change value
	 * Set the internal state
	 * and call the props
	 */
	handleChangeValue = newValue => {
		this.setState({ value: newValue });
		this.props.onChange(newValue);
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

	/**
	 * Handle change category from the child component
	 * The reason we do this because, we would like preserve
	 */
	handleChangeCategory = newCategory => {
		console.log('handle category from parent');
		this.setState({ currentCategory: newCategory });
	};

	/**
	 * Handle change search string
	 */
	handleChangeSearch = newSearch => {
		this.setState({ currentSearch: newSearch });
	};

	render() {
		// extract props for FipDropDown
		const {
			value,
			currentCategory,
			currentPage,
			currentSearch,
		} = this.state;
		const {
			icons,
			search,
			showCategory,
			showSearch,
			iconsPerPage,
			allCatPlaceholder,
		} = this.props;
		// store in an object to spread later
		const dropDownProps = {
			value,
			currentCategory,
			currentPage,
			currentSearch,
			icons,
			search,
			showCategory,
			showSearch,
			iconsPerPage,
			allCatPlaceholder,
			handleChangeValue: this.handleChangeValue,
			handleChangeCategory: this.handleChangeCategory,
			handleChangePage: this.handleChangePage,
			handleChangeSearch: this.handleChangeSearch,
		};
		return (
			<div className={this.state.elemClass}>
				<FipButton
					toggleDropDown={this.handleToggle}
					domRef={this.fipButtonRef}
				/>
				{this.state.isOpen ? (
					<FipDropDownPortal
						appendRoot={this.props.appendTo}
						domRef={this.fipDropDownRef}
					>
						<FipDropDown {...dropDownProps} />
					</FipDropDownPortal>
				) : null}
			</div>
		);
	}
}

export default FontIconPicker;
