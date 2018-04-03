// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import {
	flattenPossiblyCategorizedSource,
	fuzzySearch,
} from '../helpers/iconHelpers';

class FipIconContainer extends React.PureComponent {
	static propTypes = {
		categories: PropTypes.arrayOf(PropTypes.string),
		currentCategory: PropTypes.number,
		isMulti: PropTypes.bool.isRequired,
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
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.arrayOf(
				PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			),
		]).isRequired,
		currentSearch: PropTypes.string.isRequired,
		handleChangeValue: PropTypes.func.isRequired,
		currentPage: PropTypes.number.isRequired,
		iconsPerPage: PropTypes.number.isRequired,
		handleChangePage: PropTypes.func.isRequired,
		renderIcon: PropTypes.func.isRequired,
		noIconPlaceholder: PropTypes.string.isRequired,
	};

	static defaultProps = {
		categories: null,
		currentCategory: null,
		search: null,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		// Create iconSet, searchSet
		const iconSet = FipIconContainer.getCategoryFilteredState(
			nextProps.currentCategory,
			nextProps.categories,
			nextProps.icons,
		);
		const searchSet = FipIconContainer.getCategoryFilteredState(
			nextProps.currentCategory,
			nextProps.categories,
			nextProps.search,
		);

		// Now get the active icons and titles
		const { activeIcons, activeTitles } = FipIconContainer.getActiveIcons(
			iconSet,
			searchSet,
			nextProps.currentSearch,
		);
		// debugger; // eslint-disable-line
		// Now create the new state
		// We only basically need to create the iconView
		// for rendering
		// It depends on currentPage, activeIcons
		const { currentPage, iconsPerPage } = nextProps;
		const newState = {
			iconView: FipIconContainer.getCurrentViewIcons(
				activeIcons,
				iconsPerPage,
				currentPage,
			),
			titleView: FipIconContainer.getCurrentViewIcons(
				activeTitles,
				iconsPerPage,
				currentPage,
			),
			totalPage: Math.ceil(activeIcons.length / iconsPerPage),
		};

		// Now check if viewPage is empty, then don't reset
		// otherwise do reset
		if (prevState.viewPage !== '') {
			newState.viewPage = nextProps.currentPage + 1;
		}
		return newState;
	}

	/**
	 * Get the current set of icons, based on search
	 *
	 * @param {array} currentIconsSet icon set from where to filter
	 * @returns {array} filtered list of icons to slice on
	 */
	static getActiveIcons(currentIconsSet, currentSearchSet, searchString) {
		const iconSet = [...currentIconsSet];
		const searchSet = [...currentSearchSet];

		if (searchString === '' || searchString === null) {
			return { activeIcons: iconSet, activeTitles: searchSet };
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
			activeIcons: nIconSet,
			activeTitles: nSearchSet,
		};
	}

	/**
	 * Get icons or search set based on selected category
	 *
	 * @param {number} currentCategory current categories
	 * @param {string} key the props key to use
	 * @returns {array} filtered and flattened source
	 */
	static getCategoryFilteredState(currentCategory, categories, source) {
		let category = null;
		if (currentCategory !== 0) {
			category = categories[currentCategory];
		}
		const currentSourceSet = flattenPossiblyCategorizedSource(
			source,
			category,
		);
		return currentSourceSet;
	}

	/**
	 * Get the set of icons to show on current page
	 *
	 * @param {array} iconSet Active icon set from where to slice
	 * @param {number} iconsPerPage Number of icons per page
	 * @param {number} currentPage current page (0 based)
	 * @return {array} sliced list of icons to show on currentPage
	 */
	static getCurrentViewIcons(iconSet, iconsPerPage, currentPage) {
		const start = currentPage * iconsPerPage;
		const end = (currentPage + 1) * iconsPerPage;
		return iconSet.slice(start, end);
	}

	constructor(props) {
		super(props);
		// Just set the viewPage because it will be
		// internally managed
		// everything else will be props depedent so look into lifecycle
		// getDerivedStateFromProps
		this.state = {
			viewPage: this.props.currentPage + 1,
		};
	}

	handleChangePage = (event, force = null) => {
		let nextPage = this.props.currentPage;
		let viewPage;
		const { totalPage } = this.state;
		if (force !== null) {
			if (force === 'next') {
				nextPage += 1;
			} else {
				nextPage -= 1;
			}
		} else {
			nextPage = parseInt(event.target.value, 10) - 1;
		}

		if (nextPage < 0) {
			nextPage = 0;
		}
		if (nextPage > totalPage - 1) {
			nextPage = totalPage - 1;
		}
		viewPage = nextPage + 1;
		// This is an event listened
		// Here, the input can very much be empty
		// If so, just assume the currentPage is 0
		// But don't change the viewPage
		if (force === null && Number.isNaN(nextPage)) {
			nextPage = 0;
			viewPage = '';
		}
		// Set the viewPage
		this.setState({ viewPage });
		this.props.handleChangePage(nextPage);
		// Rest will be handled by lifecycle
	};

	handlePageKeyBoard = (event, force) => {
		event.preventDefault();
		if (event.keyCode === 13 || event.keyCode === 32) {
			this.handleChangePage({}, force);
		}
	};

	handleChangeValue = value => {
		this.props.handleChangeValue(value);
	};

	handleValueKeyboard = (event, value) => {
		if (event.keyCode === 13 || event.keyCode === 32) {
			this.handleChangeValue(value);
		}
	};

	renderPager() {
		if (this.state.totalPage < 1) {
			return null;
		}
		const left =
			this.props.currentPage > 0 ? (
				<span
					className="rfipicons__left"
					role="button"
					tabIndex={0}
					onKeyDown={event => this.handlePageKeyBoard(event, 'prev')}
					onClick={event => this.handleChangePage(event, 'prev')}
				>
					<span
						role="presentation"
						aria-hidden="true"
						className="rfipicons__label"
						aria-label="Left"
					>
						<svg
							viewBox="0 0 1792 1792"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" />
						</svg>
					</span>
				</span>
			) : null;
		const right =
			this.props.currentPage < this.state.totalPage - 1 ? (
				<span
					className="rfipicons__right"
					role="button"
					tabIndex={0}
					onKeyDown={event => this.handlePageKeyBoard(event, 'next')}
					onClick={event => this.handleChangePage(event, 'next')}
				>
					<span
						role="presentation"
						aria-hidden="true"
						className="rfipicons__label"
						aria-label="Right"
					>
						<svg
							viewBox="0 0 1792 1792"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" />
						</svg>
					</span>
				</span>
			) : null;
		return (
			<div className="rfipicons__pager">
				<div className="rfipicons__num">
					<input
						value={this.state.viewPage}
						onChange={this.handleChangePage}
						className="rfipicons__cp"
						type="tel"
						min={1}
					/>
					<span className="rfipicons__sp">/</span>
					<span className="rfipicons__tp">
						{this.state.totalPage}
					</span>
				</div>
				<div className="rfipicons__arrow">
					{left}
					{right}
				</div>
			</div>
		);
	}

	renderIconView() {
		if (this.state.totalPage > 0) {
			return this.state.iconView.map((icon, index) => {
				const iconClass = className('rfipicons__icon', {
					'rfipicons__icon--selected':
						this.props.value === icon ||
						(Array.isArray(this.props.value) &&
							this.props.value.includes(icon)),
				});
				return (
					<span
						className={iconClass}
						key={icon}
						title={this.state.titleView[index]}
						tabIndex={0}
						role="button"
						onClick={() => this.handleChangeValue(icon)}
						onKeyDown={e => this.handleValueKeyboard(e, icon)}
					>
						<span className="rfipicons__ibox">
							{this.props.renderIcon(icon)}
						</span>
					</span>
				);
			});
		}
		return (
			<span className="rfipicons__icon--error">
				<span className="rfipicons__ibox--error">
					{this.props.noIconPlaceholder}
				</span>
			</span>
		);
	}

	render() {
		return (
			<div className="rfipicons">
				{this.renderPager()}
				<div className="rfipicons__selector">
					{this.renderIconView()}
				</div>
			</div>
		);
	}
}

export default FipIconContainer;
