// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import { CSSTransition } from 'react-transition-group';
import FipButton from './FipButton';
import FipDropDown from './FipDropDown';
import FipDropDownPortal from './FipDropDownPortal';
import { convertToHex } from '../helpers/iconHelpers';

// declare some predefined value
// for use with PureComponent
const defaultMultiValue = [];
const defaultStringValue = '';

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
			PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
			PropTypes.arrayOf(PropTypes.string),
		]),
		iconsPerPage: PropTypes.number,
		theme: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		showCategory: PropTypes.bool,
		showSearch: PropTypes.bool,
		value: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number),
			PropTypes.number,
			PropTypes.string,
		]),
		isMulti: PropTypes.bool,
		renderUsing: PropTypes.string,
		convertHex: PropTypes.bool,
		renderFunc: PropTypes.func,
		appendTo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		allCatPlaceholder: PropTypes.string,
		searchPlaceholder: PropTypes.string,
		noIconPlaceholder: PropTypes.string,
		noSelectedPlaceholder: PropTypes.string,
	};

	static defaultProps = {
		search: null,
		iconsPerPage: 20,
		theme: 'default',
		showCategory: true,
		showSearch: true,
		value: null,
		isMulti: true,
		renderUsing: 'data-icomoon',
		convertHex: true,
		renderFunc: null,
		appendTo: false,
		allCatPlaceholder: 'Show from all',
		searchPlaceholder: 'Search Icons',
		noIconPlaceholder: 'No icons found',
		noSelectedPlaceholder: 'Select icon',
	};

	static displayName = 'FontIconPicker';

	static getDerivedStateFromProps(nextProps) {
		// Init the state
		const newState = {};
		// Listen for theme change
		newState.elemClass = FontIconPicker.getDerivedClassName(
			'rfip',
			nextProps.theme,
			nextProps.isMulti,
		);
		newState.btnClass = FontIconPicker.getDerivedClassName(
			'rfipbtn',
			nextProps.theme,
			nextProps.isMulti,
		);
		newState.ddClass = FontIconPicker.getDerivedClassName(
			'rfipdropdown',
			nextProps.theme,
			nextProps.isMulti,
		);

		// change the value if needed
		newState.value = FontIconPicker.getDerivedValue(
			nextProps.value,
			nextProps.isMulti,
		);

		// Set internal category to 0 if not showing category
		if (!nextProps.showCategory) {
			newState.currentCategory = 0;
			newState.currentPage = 0;
		}

		// Set internal search to empty, if not showing search
		if (!nextProps.showSearch) {
			newState.currentSearch = '';
			newState.currentPage = 0;
		}

		// rest will be handled by children
		// so chill...
		return newState;
	}

	/**
	 * Get dervied (BEM) classname for provided theme
	 *
	 * @param {string} base the base className
	 * @param {string} theme Name of the theme
	 * @param {boolean} isMulti Whether or not multiple
	 * @return {string} Calculated theme
	 */
	static getDerivedClassName(base, theme, isMulti) {
		// the class (BEM)
		return className(
			// block
			base,
			// modifier
			// 1. theme
			`${base}--${theme}`,
			{
				// 2. multi
				[`${base}--multi`]: isMulti,
			},
		);
	}

	static getDerivedValue(value, isMulti) {
		let newValue = value;
		// If multiple, then do set the accordingly
		if (isMulti) {
			if (!Array.isArray(value)) {
				newValue = defaultMultiValue;
			} else {
				newValue = [...value];
			}
		} else if (value === null) {
			newValue = defaultStringValue;
		}
		return newValue;
	}

	constructor(props) {
		// Call the super
		super(props);
		// some references we need for outside click
		this.fipButtonRef = React.createRef();
		this.fipDropDownRef = React.createRef();

		// create the state
		this.state = {
			currentCategory: 0,
			currentPage: 0,
			isOpen: false,
			currentSearch: '',
		};

		// internel state for handling animation
		this.fipPortalComputedStyle = null;
	}

	componentDidMount() {
		const events = ['mousedown', 'touchend'];
		events.forEach(value => {
			document.addEventListener(value, this.handleOuterClick, false);
		});
		document.addEventListener('keydown', this.handleEscapeKeyboard, false);
	}

	componentWillUnmount() {
		const events = ['mousedown', 'touchend'];
		events.forEach(value => {
			document.removeEventListener(value, this.handleOuterClick, false);
		});
		document.removeEventListener(
			'keydown',
			this.handleEscapeKeyboard,
			false,
		);
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
		// close the dropdown
		this.closeDropdown();
	};

	handleEscapeKeyboard = event => {
		if (event.keyCode === 27) {
			this.closeDropdown();
		}
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
	 * Open the dropdown by setting the state
	 */
	openDropdown = () => {
		this.setState({ isOpen: true });
	};

	/**
	 * Close the dropdown by setting the state
	 */
	closeDropdown = () => {
		this.setState({ isOpen: false });
	};

	/**
	 * Handle change value
	 * Set the internal state
	 * and call the props
	 */
	handleChangeValue = value => {
		let newValue;
		if (this.props.isMulti) {
			newValue = [...this.state.value];
			// If it is not already in the
			// values, then push it
			if (!newValue.includes(value)) {
				newValue.push(value);
			} else {
				// delete it
				newValue = newValue.filter(item => item !== value);
				// If the length becomes 0, then ref to previously defined
				// variable, to help with PureComponent
				if (!newValue.length) {
					newValue = defaultMultiValue;
				}
			}
		} else if (value === this.state.value) {
			// It is a non multiple thing
			// So delete it or assign it
			// Also ref it from a previously defined
			// variable, to help in performance
			newValue = defaultStringValue;
		} else {
			newValue = value;
		}
		this.setState({ value: newValue });
		this.props.onChange(newValue);
	};

	handleDeleteValue = value => {
		let newValue;
		if (this.props.isMulti) {
			newValue = this.state.value.filter(item => item !== value);
		} else {
			// assign the empty value
			newValue = null;
		}
		// this.setState({ value: newValue });
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
		this.setState({ currentCategory: newCategory, currentPage: 0 });
	};

	/**
	 * Handle change search string
	 */
	handleChangeSearch = newSearch => {
		this.setState({ currentSearch: newSearch, currentPage: 0 });
	};

	/**
	 * Reset portal styles to normal
	 */
	resetPortalStyle = selectorNode => {
		['maxHeight', 'paddingTop', 'paddingBottom'].forEach(key => {
			selectorNode.style[key] = null; // eslint-disable-line
		});
	};

	handlePortalEnter = node => {
		const selectorNode = node.childNodes[0];
		this.resetPortalStyle(selectorNode);
		const computedStyle = getComputedStyle(selectorNode);
		this.fipPortalComputedStyle = {
			height: computedStyle.height,
			paddingTop: computedStyle.paddingTop,
			paddingBottom: computedStyle.paddingBottom,
		};
		['maxHeight', 'paddingTop', 'paddingBottom'].forEach(key => {
			selectorNode.style[key] = '0px';
		});
	};
	handlePortalEntering = node => {
		const selectorNode = node.childNodes[0];
		selectorNode.style.maxHeight = this.fipPortalComputedStyle.height;
		selectorNode.style.paddingTop = this.fipPortalComputedStyle.paddingTop;
		selectorNode.style.paddingBottom = this.fipPortalComputedStyle.paddingBottom;
	};
	handlePortalEntered = node => {
		// reset style
		const selectorNode = node.childNodes[0];
		this.resetPortalStyle(selectorNode);
		// focus on search
		selectorNode.querySelector('.rfipsearch__input').focus();
	};
	handlePortalExit = node => {
		const selectorNode = node.childNodes[0];
		this.resetPortalStyle(selectorNode);
		const { height } = getComputedStyle(selectorNode);
		selectorNode.style.maxHeight = height;
	};
	handlePortalExiting = node => {
		const selectorNode = node.childNodes[0];
		selectorNode.style.maxHeight = '0px';
		selectorNode.style.paddingTop = '0px';
		selectorNode.style.paddingBottom = '0px';
	};

	renderIcon = icon => {
		if (typeof this.props.renderFunc === 'function') {
			return this.props.renderFunc(icon);
		}
		if (this.props.renderUsing === 'class') {
			return <i className={icon} />;
		}
		const attributes = {
			[this.props.renderUsing]: this.props.convertHex
				? convertToHex(icon)
				: icon,
		};
		return <i {...attributes} />;
	};

	render() {
		// extract props for FipDropDown and
		// store in an object to spread later
		const dropDownProps = {
			currentCategory: this.state.currentCategory,
			currentPage: this.state.currentPage,
			currentSearch: this.state.currentSearch,
			value: this.state.value,
			isMulti: this.props.isMulti,
			icons: this.props.icons,
			search: this.props.search,
			showCategory: this.props.showCategory,
			showSearch: this.props.showSearch,
			iconsPerPage: this.props.iconsPerPage,
			allCatPlaceholder: this.props.allCatPlaceholder,
			searchPlaceholder: this.props.searchPlaceholder,
			noIconPlaceholder: this.props.noIconPlaceholder,
			renderIcon: this.renderIcon,
			handleChangeValue: this.handleChangeValue,
			handleChangeCategory: this.handleChangeCategory,
			handleChangePage: this.handleChangePage,
			handleChangeSearch: this.handleChangeSearch,
		};
		return (
			<div className={this.state.elemClass} ref={this.fipRef}>
				<FipButton
					className={this.state.btnClass}
					isOpen={this.state.isOpen}
					toggleDropDown={this.handleToggle}
					domRef={this.fipButtonRef}
					isMulti={this.props.isMulti}
					value={this.state.value}
					renderIcon={this.renderIcon}
					handleDeleteValue={this.handleDeleteValue}
					noSelectedPlaceholder={this.props.noSelectedPlaceholder}
				/>
				<CSSTransition
					classNames="fipappear"
					timeout={250}
					in={this.state.isOpen}
					unmountOnExit
					onEnter={this.handlePortalEnter}
					onEntering={this.handlePortalEntering}
					onEntered={this.handlePortalEntered}
					onExit={this.handlePortalExit}
					onExiting={this.handlePortalExiting}
				>
					<FipDropDownPortal
						appendRoot={this.props.appendTo}
						domRef={this.fipDropDownRef}
						btnRef={this.fipButtonRef}
						className={this.state.ddClass}
					>
						<FipDropDown {...dropDownProps} />
					</FipDropDownPortal>
				</CSSTransition>
			</div>
		);
	}
}

export default FontIconPicker;
