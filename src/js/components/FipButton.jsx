// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class FipButton extends React.PureComponent {
	static propTypes = {
		className: PropTypes.string.isRequired,
		isOpen: PropTypes.bool.isRequired,
		onClick: PropTypes.func.isRequired,
		domRef: PropTypes.object.isRequired, // eslint-disable-line
		isMulti: PropTypes.bool.isRequired,
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.arrayOf(
				PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			),
		]).isRequired,
		renderIcon: PropTypes.func.isRequired,
		handleDeleteValue: PropTypes.func.isRequired,
		noSelectedPlaceholder: PropTypes.string.isRequired,
	};

	handleClick = () => {
		this.props.onClick();
	};

	handleKeyDown = event => {
		// Toggle on enter or keyspace
		if (event.keyCode === 32 || event.keyCode === 13) {
			this.props.onClick();
		}
	};

	handleDelete = (event, icon) => {
		event.stopPropagation();
		this.props.handleDeleteValue(icon);
	};

	handleDeleteKeyboard = (event, icon) => {
		if (event.keyCode === 32 || event.keyCode === 13) {
			this.props.handleDeleteValue(icon);
		}
	};

	renderIcon(icon) {
		if (icon === '' || icon === null || icon === undefined) {
			return this.renderEmptyIcon();
		}
		return (
			<span className="rfipbtn__icon" key={icon}>
				<span className="rfipbtn__elm">
					{this.props.renderIcon(icon)}
				</span>
				<span
					className="rfipbtn__del"
					onClick={e => this.handleDelete(e, icon)}
					onKeyDown={e => this.handleDeleteKeyboard(e, icon)}
					tabIndex={0}
					role="button"
				>
					&times;
				</span>
			</span>
		);
	}

	renderEmptyIcon = () => (
		<span className="rfipbtn__icon--empty">
			{this.props.noSelectedPlaceholder}
		</span>
	);

	renderCurrentIcons() {
		if (this.props.isMulti) {
			if (!this.props.value.length) {
				return this.renderEmptyIcon();
			}
			return this.props.value.map(icon => this.renderIcon(icon));
		}
		return this.renderIcon(this.props.value);
	}

	render() {
		const handlers = {
			onClick: this.handleClick,
			onKeyDown: this.handleKeyDown,
			onFocus: this.handleFocus,
			onBlur: this.handleBlur,
			tabIndex: 0,
		};

		const btnClass = classNames(
			'rfipbtn__button',
			`rfipbtn__button--${this.props.isOpen ? 'open' : 'close'}`,
		);

		const elmClass = classNames(this.props.className);

		return (
			<div className={elmClass} ref={this.props.domRef} {...handlers}>
				<div className="rfipbtn__current">
					{this.renderCurrentIcons()}
				</div>
				<div className={btnClass}>
					<i
						className="fipicon-angle-down"
						role="presentation"
						aria-label="Open"
					/>
				</div>
			</div>
		);
	}
}

export default FipButton;
