// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import FipCategory from './FipCategory';
import FipSearch from './FipSearch';
import FipIconContainer from './FipIconContainer';
import { getPossibleCategories } from '../helpers/iconHelpers';

class FipDropDown extends React.PureComponent {
	static propTypes = {
		isMulti: PropTypes.bool.isRequired,
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.any),
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
		/* eslint-disable */
		search: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.arrayOf(PropTypes.string),
		]),
		/* eslint-enable */
		showCategory: PropTypes.bool.isRequired,
		showSearch: PropTypes.bool.isRequired,
		iconsPerPage: PropTypes.number.isRequired,
		allCatPlaceholder: PropTypes.string.isRequired, // eslint-disable-line
		searchPlaceholder: PropTypes.string.isRequired, // eslint-disable-line
		noIconPlaceholder: PropTypes.string.isRequired, // eslint-disable-line
		renderIcon: PropTypes.func.isRequired,
		handleChangeValue: PropTypes.func.isRequired,
		handleChangeCategory: PropTypes.func.isRequired,
		handleChangePage: PropTypes.func.isRequired,
		handleChangeSearch: PropTypes.func.isRequired,
	};

	static defaultProps = {
		search: null,
	};

	static getDerivedStateFromProps(nextProps) {
		// Get categories and flattened source
		let categories = getPossibleCategories(nextProps.icons);
		if (categories !== null) {
			categories = [nextProps.allCatPlaceholder, ...categories];
		}
		// assign to the state
		// rest is handled by props
		return { categories, searchString: nextProps.currentSearch };
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	/**
	 * Handle category change
	 *
	 * Sets internal state and also calls the parent app.
	 */
	handleCategory = event => {
		// Get the category
		let currentCategory = parseInt(event.target.value, 10);
		if (Number.isNaN(currentCategory)) {
			currentCategory = 0;
		}
		// call the external handler
		this.props.handleChangeCategory(currentCategory);

		// Also change the pagenumber to 0
		this.props.handleChangePage(0);
	};

	handleSearch = event => {
		const currentSearch = event.target.value;
		// Change the state of the parent
		this.props.handleChangeSearch(currentSearch);
	};

	render() {
		return (
			<div className="rfipdropdown__selector">
				{this.props.showSearch ? (
					<FipSearch
						handleSearch={this.handleSearch}
						value={this.state.searchString}
						placeholder={this.props.searchPlaceholder}
					/>
				) : null}

				{this.props.showCategory &&
				this.state.categories &&
				this.state.categories.length ? (
					<FipCategory
						handleCategory={this.handleCategory}
						value={this.props.currentCategory}
						categories={this.state.categories}
					/>
				) : null}

				<FipIconContainer
					categories={this.state.categories}
					currentCategory={this.props.currentCategory}
					isMulti={this.props.isMulti}
					icons={this.props.icons}
					search={this.props.search}
					value={this.props.value}
					currentSearch={this.props.currentSearch}
					handleChangeValue={this.props.handleChangeValue}
					currentPage={this.props.currentPage}
					iconsPerPage={this.props.iconsPerPage}
					handleChangePage={this.props.handleChangePage}
					renderIcon={this.props.renderIcon}
					noIconPlaceholder={this.props.noIconPlaceholder}
				/>
			</div>
		);
	}
}

export default FipDropDown;
