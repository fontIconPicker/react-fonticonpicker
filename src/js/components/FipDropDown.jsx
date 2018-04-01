// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import FipCategory from './FipCategory';
import FipSearch from './FipSearch';
import {
	getPossibleCategories,
	flattenPossiblyCategorizedSource,
	fuzzySearch,
} from '../helpers/iconHelpers';
import FipIconContainer from './FipIconContainer';

class FipDropDown extends React.PureComponent {
	static propTypes = {
		isMulti: PropTypes.bool.isRequired,
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number),
		]).isRequired,
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
		renderUsing: PropTypes.string.isRequired,
		convertHex: PropTypes.bool.isRequired,
		renderFunc: PropTypes.func,
		handleChangeValue: PropTypes.func.isRequired,
		handleChangeCategory: PropTypes.func.isRequired,
		handleChangePage: PropTypes.func.isRequired,
		handleChangeSearch: PropTypes.func.isRequired,
	};

	static defaultProps = {
		search: null,
		renderFunc: null,
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

		const {
			iconSet: activeIcons,
			searchSet: activeTitles,
		} = this.getActiveIcons(
			currentIconsSet,
			currentSearchSet,
			this.props.currentSearch,
		);

		// set state
		this.state = {
			currentCategory: this.props.currentCategory,
			currentIconsSet,
			currentSearchSet,
			activeIcons,
			activeTitles,
			searchString: this.props.currentSearch,
		};
	}

	/**
	 * Get icons or search set based on selected category
	 *
	 * @param {number} currentCategory current categories
	 * @param {string} key the props key to use
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
	 * @param {array} currentIconsSet icon set from where to filter
	 * @returns {array} filtered list of icons to slice on
	 */
	getActiveIcons = (currentIconsSet, currentSearchSet, searchString) => {
		const iconSet = [...currentIconsSet];
		const searchSet = [...currentSearchSet];

		if (searchString === '') {
			return { iconSet, searchSet };
		}
		const nIconSet = [];
		const nSearchSet = [];

		iconSet.forEach((value, index) => {
			if (fuzzySearch(searchString, currentSearchSet[index])) {
				nIconSet.push(value);
				nSearchSet.push(currentSearchSet[index]);
			}
		});
		return {
			iconSet: nIconSet,
			searchSet: nSearchSet,
		};
	};

	/**
	 * Handle category change
	 *
	 * Sets internal state and also calls the parent app.
	 */
	handleCategory = event => {
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
		const {
			iconSet: activeIcons,
			searchSet: activeTitles,
		} = this.getActiveIcons(
			currentIconsSet,
			currentSearchSet,
			this.state.searchString,
		);

		// update state
		this.setState({
			currentIconsSet,
			currentSearchSet,
			activeIcons,
			activeTitles,
			currentCategory,
		});

		// call the external handler
		this.props.handleChangeCategory(currentCategory);
	};

	handleSearch = event => {
		const currentSearch = event.target.value;
		const {
			iconSet: activeIcons,
			searchSet: activeTitles,
		} = this.getActiveIcons(
			this.state.currentIconsSet,
			this.state.currentSearchSet,
			currentSearch,
		);

		this.setState({
			searchString: currentSearch,
			activeIcons,
			activeTitles,
		});
		this.props.handleChangeSearch(currentSearch);
	};

	render() {
		return (
			<div className="rfipdropdown__selector">
				{this.props.showSearch ? (
					<FipSearch
						handleSearch={this.handleSearch}
						value={this.state.searchString}
					/>
				) : null}

				{this.props.showCategory &&
				this.categories &&
				this.categories.length ? (
					<FipCategory
						handleCategory={this.handleCategory}
						value={this.state.currentCategory}
						categories={this.categories}
					/>
				) : null}

				<FipIconContainer
					isMulti={this.props.isMulti}
					iconSet={this.state.activeIcons}
					titleSet={this.state.activeTitles}
					value={this.props.value}
					onChange={this.props.handleChangeValue}
					currentPage={this.props.currentPage}
					iconsPerPage={this.props.iconsPerPage}
					handleChangePage={this.props.handleChangePage}
					renderUsing={this.props.renderUsing}
					convertHex={this.props.convertHex}
					renderFunc={this.props.renderFunc}
				/>
			</div>
		);
	}
}

export default FipDropDown;
