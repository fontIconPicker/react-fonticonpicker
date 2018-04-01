// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';

import { fuzzySearch, convertToHex } from '../helpers/iconHelpers';

class FipIconContainer extends React.PureComponent {
	static propTypes = {
		isMulti: PropTypes.bool.isRequired,
		iconSet: PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		).isRequired,
		titleSet: PropTypes.arrayOf(
			PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		).isRequired,
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number),
		]).isRequired,
		onChange: PropTypes.func.isRequired,
		currentPage: PropTypes.number.isRequired,
		iconsPerPage: PropTypes.number.isRequired,
		handleChangePage: PropTypes.func.isRequired,
		renderUsing: PropTypes.string.isRequired,
		convertHex: PropTypes.bool.isRequired,
		renderFunc: PropTypes.func,
	};

	static defaultProps = {
		renderFunc: null,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		const newState = {
			iconView: FipIconContainer.getCurrentViewIcons(nextProps),
		};
		return newState;
	}

	/**
	 * Get the set of icons to show on current page
	 *
	 * @return {array} sliced list of icons to show on currentPage
	 */
	static getCurrentViewIcons({ iconSet, currentPage, iconsPerPage }) {
		const start = currentPage * iconsPerPage;
		const end = (currentPage + 1) * iconsPerPage;
		return iconSet.slice(start, end);
	}

	constructor(props) {
		super(props);

		this.state = {
			iconView: this.constructor.getCurrentViewIcons(this.props),
		};
	}

	renderIcon(icon) {
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
	}

	render() {
		return (
			<div className="rfipicons">
				<div className="rfipicons__current" />
				<div className="rfipicons__selector">
					{this.state.iconView.map((icon, index) => (
						<span
							className="rfipicons__selector__icon"
							key={icon}
							title={this.props.titleSet[index]}
						>
							{this.renderIcon(icon)}
						</span>
					))}
				</div>
				<div className="rfipicons_pager" />
			</div>
		);
	}
}

export default FipIconContainer;
