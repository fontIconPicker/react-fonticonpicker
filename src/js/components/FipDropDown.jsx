// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import {
	getPossibleCategories,
	flattenPossiblyCategorizedSource,
	fuzzySearch,
} from '../helpers/iconHelpers';

class FipDropDown extends React.PureComponent {
	static propTypes = {
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number),
		]),
		currentCategory: PropTypes.number.isRequired,
		currentPage: PropTypes.number.isRequired,
		currentSearch: PropTypes.string.isRequired,
		icons: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.number),
			PropTypes.arrayOf(PropTypes.string),
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
		showCategory: PropTypes.bool.isRequired,
		showSearch: PropTypes.bool.isRequired,
		iconsPerPage: PropTypes.number.isRequired,
		allCatPlaceholder: PropTypes.string.isRequired,
		handleChangeValue: PropTypes.func.isRequired,
		handleChangeCategory: PropTypes.func.isRequired,
		handleChangePage: PropTypes.func.isRequired,
		handleChangeSearch: PropTypes.func.isRequired,
	};

	static defaultProps = {
		search: null,
		value: '',
	};

	constructor(props) {
		super(props);
		// Get categories and flattened source
		let categories = getPossibleCategories(this.props.icons);
		if (categories !== null) {
			categories = [this.props.allCatPlaceholder, ...categories];
		}
		// assign to a property
		this.categories = categories;
		console.log(this.categories);
		// Now check against the currently selected category and get flattened
		// icons and search
		const currentIconsSet = this.getCategoryFilteredState(
			this.props.currentCategory,
			'icons',
		);

		const currentSearchSet = this.getCategoryFilteredState(
			this.props.currentCategory,
			'search',
		);

		// set state
		this.state = {
			currentCategory: this.props.currentCategory,
			currentIconsSet,
			currentSearchSet,
			searchString: this.props.currentSearch,
		};
	}

	/**
	 * Get icons or search set based on selected category
	 *
	 * @param {number} current categories
	 * @param {string} the props key to use
	 * @returns {array} filtered and flattened source
	 */
	getCategoryFilteredState(currentCategory, key) {
		let category = null;
		if (currentCategory !== 0) {
			category = this.categories[currentCategory];
		}
		const currentSourceSet = flattenPossiblyCategorizedSource(
			this.props[key],
			category,
		);
		return currentSourceSet;
	}

	/**
	 * Get the current set of icons, based on search
	 *
	 * @returns {array} filtered list of icons to slice on
	 */
	getCurrentEnumIcons() {
		const iconSet = [...this.state.currentIconsSet];
		const { searchString, currentSearchSet } = this.state;

		if (searchString === '') {
			return iconSet;
		}
		return iconSet.filter((value, index) =>
			fuzzySearch(searchString, currentSearchSet[index]),
		);
	}

	/**
	 * Get the set of icons to show on current page
	 *
	 * @return {array} sliced list of icons to show on currentPage
	 */
	getCurrentViewIcons() {
		const iconSet = this.getCurrentEnumIcons();
		const { currentPage, iconsPerPage } = this.props;
		const start = currentPage * iconsPerPage;
		const end = (currentPage + 1) * iconsPerPage;
		return iconSet.slice(start, end);
	}

	/**
	 * Handle category change
	 *
	 * Sets internal state and also calls the parent app.
	 */
	handleCategory = event => {
		console.log('Handle category from child');
		const currentCategory = parseInt(event.target.value, 10);
		// Now check against the currently selected category and get flattened
		// icons and search
		const currentIconsSet = this.getCategoryFilteredState(
			currentCategory,
			'icons',
		);
		const currentSearchSet = this.getCategoryFilteredState(
			currentCategory,
			'search',
		);

		// update state
		this.setState({
			currentIconsSet,
			currentSearchSet,
			currentCategory,
		});

		// call the external handler
		this.props.handleChangeCategory(currentCategory);
	};

	render() {
		const icons = this.getCurrentViewIcons();
		console.log(this.state.currentCategory);
		return (
			<div className="rfipdropdown__selector">
				<select
					className="rfipdropdown__selector__select"
					onChange={this.handleCategory}
					value={this.state.currentCategory}
				>
					{this.categories.map((value, index) => (
						<option key={value} value={index}>
							{value}
						</option>
					))}
				</select>
				<div className="rfipdropdown__selector__icons">
					{icons.map(value => <span key={value}>{value}</span>)}
				</div>
			</div>
		);
	}
}

export default FipDropDown;
