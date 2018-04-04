// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import className from 'classnames';
import { getOffset } from '../helpers/iconHelpers';

class FipDropDownPortal extends React.PureComponent {
	static propTypes = {
		appendRoot: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // eslint-disable-line
		children: PropTypes.node.isRequired,
		domRef: PropTypes.object.isRequired, // eslint-disable-line
		btnRef: PropTypes.object.isRequired, // eslint-disable-line
	};

	static defaultProps = {
		appendRoot: false,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		// The only thing we are interested is the appendRoot
		if (nextProps.appendRoot !== prevState.appendRoot) {
			const {
				appendRoot,
				portalClasses,
			} = FipDropDownPortal.calculateAppendAndClass(nextProps.appendRoot);
			return {
				appendRoot,
				portalClasses,
			};
		}
		return null;
	}

	/**
	 * Calculate append Node and Portal classes based on appendRoot settings
	 *
	 * @param {string} appendRoot self or a querySelector valid string
	 * @return {object} Object with portalClasses and appendRoot
	 */
	static calculateAppendAndClass(appendRoot) {
		// where to append the dropdown?
		let rootNode = 'self';
		const portalClasses = className('rfipdropdown', {
			'rfipdropdown--portal': appendRoot !== false,
		});
		if (appendRoot !== false) {
			// fip assumes that the node is already in the DOM tree
			// we definitely wan't to use something like body or another
			// root level stuff to apply our style?
			// let me know if a use case of detached dom arrives
			rootNode = document.querySelector(appendRoot);
		}
		return {
			portalClasses,
			appendRoot: rootNode,
		};
	}

	constructor(props) {
		super(props);

		// currently set the state to empty
		// because it will be rendered by the
		// getDerivedStateFromProps lifecycle method
		this.state = {};
	}

	componentDidMount() {
		window.addEventListener('resize', this.syncPortalPosition);
		this.syncPortalPosition();
	}

	componentDidUpdate() {
		this.syncPortalPosition();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.syncPortalPosition);
	}

	syncPortalPosition = () => {
		// if mounting not to self, then position the portal
		if (this.state.appendRoot !== 'self') {
			// setTimeout(() => this.positionPortal(), 10);
			this.positionPortal();
		}

		// Fix window overflow
		this.fixWindowOverflow();
	};

	positionPortal() {
		// Temporarily hide the popup to make calculations work
		const { display } = this.props.domRef.current.style;
		this.props.domRef.current.style.display = 'none';

		// Calculate offset of DOM node
		const { current: btn } = this.props.btnRef;
		const btnOffset = getOffset(btn);

		const parentOffset = getOffset(this.state.appendRoot);
		const btnHeight = btn.offsetHeight;

		// Set the style
		this.props.domRef.current.style.left = `${btnOffset.left -
			parentOffset.left}px`;
		this.props.domRef.current.style.top = `${btnOffset.top + btnHeight}px`;

		// Restore the style
		this.props.domRef.current.style.display = display;
	}

	fixWindowOverflow = () => {
		const popupWidth = this.props.domRef.current.offsetWidth;
		const windowWidth = window.innerWidth;
		const { left: popupOffsetLeft } = getOffset(this.props.domRef.current);
		const containerOffset =
			this.state.appendRoot === 'self'
				? getOffset(this.props.btnRef.current)
				: getOffset(this.state.appendRoot);

		// If appearing from left overflows window
		if (
			popupOffsetLeft + popupWidth >
			windowWidth - 20 /* 20px adjustment for better appearance */
		) {
			// First we try to position with right aligned
			let preferredLeft;
			if (this.state.appendRoot === 'self') {
				preferredLeft =
					this.props.btnRef.current.offsetWidth - popupWidth;
			} else {
				const pickerOffsetRight =
					getOffset(this.props.btnRef.current).left +
					this.props.btnRef.current.offsetWidth;
				preferredLeft = Math.floor(
					pickerOffsetRight - popupWidth - 1,
				); /** 1px adjustment for sub-pixels */
			}
			// If preferredLeft would put the popup out of window from left
			// then don't do it
			if (preferredLeft < 0 && this.state.appendRoot !== 'self') {
				this.props.domRef.current.style.left = `${windowWidth -
					20 -
					popupWidth -
					containerOffset.left}px`;
			} else {
				// Put it in the preferred position
				this.props.domRef.current.style.left = `${preferredLeft}px`;
			}
		} else if (this.state.appendRoot === 'self') {
			this.props.domRef.current.style.left = '0px';
		}
	};

	render() {
		const fipDropDownNode = (
			<div className={this.state.portalClasses} ref={this.props.domRef}>
				{this.props.children}
			</div>
		);
		// should we render to a portal or
		// just usual?
		if (this.state.appendRoot === 'self') {
			// render to the App itself
			return fipDropDownNode;
		}
		// render to the DOM
		return createPortal(fipDropDownNode, this.state.appendRoot);
	}
}

export default FipDropDownPortal;
