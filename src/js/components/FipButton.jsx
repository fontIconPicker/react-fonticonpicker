// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class FipButton extends React.PureComponent {
	static propTypes = {
		toggleDropDown: PropTypes.func.isRequired,
	};

	static buttonClass = 'rfipbtn__button';

	constructor(props) {
		super(props);
		// do something here
		const buttonClasses = classNames(this.constructor.buttonClass);
		this.state = {
			buttonClasses,
		};
	}

	handleClick = event => {
		event.preventDefault();
		this.props.toggleDropDown();
	};

	handleKeyDown = event => {
		// Toggle on enter or keyspace
		if (event.keyCode === 32 || event.keyCode === 13) {
			event.preventDefault();
			this.props.toggleDropDown();
		}
	};

	handleFocus = () => {
		const buttonClasses = classNames(
			this.constructor.buttonClass,
			`${this.constructor.buttonClass}--focus`,
		);
		this.setState({ buttonClasses });
	};

	handleBlur = () => {
		const buttonClasses = classNames(this.constructor.buttonClass);
		this.setState({ buttonClasses });
	};

	render() {
		const handlers = {
			onClick: this.handleClick,
			onKeyDown: this.handleKeyDown,
			onFocus: this.handleFocus,
			onBlur: this.handleBlur,
		};

		return (
			<div className="rfipbtn">
				<button className={this.state.buttonClasses} {...handlers}>
					Open Me
				</button>
			</div>
		);
	}
}

export default FipButton;
