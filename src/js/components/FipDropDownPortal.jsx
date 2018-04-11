// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import className from 'classnames';
import { getOffset, debounce } from '../helpers/iconHelpers';

class FipDropDownPortal extends React.PureComponent {
	static propTypes = {
		appendRoot: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // eslint-disable-line
		children: PropTypes.node.isRequired,
		domRef: PropTypes.object.isRequired, // eslint-disable-line
		btnRef: PropTypes.object.isRequired, // eslint-disable-line
		className: PropTypes.string.isRequired,
	};

	static defaultProps = {
		appendRoot: false,
	};

	static getDerivedStateFromProps(nextProps) {
		// The only thing we are interested is the appendRoot
		const {
			appendRoot,
			portalClasses,
		} = FipDropDownPortal.calculateAppendAndClass(nextProps.appendRoot);
		return {
			appendRoot,
			portalClasses,
		};
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
		const portalClasses = className({
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

		// A debounced function for resize and scroll
		this.debouncedSyncPortalPosition = debounce(
			this.syncPortalPosition,
			250,
		);
	}

	componentDidMount() {
		window.addEventListener('resize', this.debouncedSyncPortalPosition);
		window.addEventListener('scroll', this.debouncedSyncPortalPosition);
		this.syncPortalPosition();
	}

	componentDidUpdate() {
		this.syncPortalPosition();
	}
	/* istanbul ignore next */
	componentWillUnmount() {
		window.removeEventListener('resize', this.debouncedSyncPortalPosition);
		window.removeEventListener('scroll', this.debouncedSyncPortalPosition);
	}

	syncPortalPosition = () => {
		// reset the portal
		this.resetPortalPosition();

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

	resetPortalPosition() {
		const { current: dropDown } = this.props.domRef;
		if (this.state.appendRoot === 'self') {
			// The top would be none
			dropDown.style.top = '';
		} else {
			this.positionPortal();
		}
	}

	fixWindowOverflow = /* istanbul ignore next */ () => {
		const popupWidth = this.props.domRef.current.offsetWidth;
		const popupHeight = this.props.domRef.current.offsetHeight;
		const { innerWidth: windowWidth, pageYOffset } = window;
		const { clientHeight } = document.documentElement;

		const { left: popupOffsetLeft, top: popupOffsetTop } = getOffset(
			this.props.domRef.current,
		);
		const rootElm =
			this.state.appendRoot === 'self'
				? this.props.domRef.current
				: this.state.appendRoot;
		const rootOffset = getOffset(rootElm);
		const { current: btn } = this.props.btnRef;
		const { current: dropDown } = this.props.domRef;
		const btnOffset = getOffset(btn);
		const btnStyles = getComputedStyle(btn);
		const btnBorder =
			(parseInt(btnStyles.borderTop, 10) || 0) +
			(parseInt(btnStyles.borderBottom, 10) || 0);

		// We need to calculate if the popup is going to overflow the window
		if (popupOffsetLeft + popupWidth > windowWidth - 20) {
			let preferredLeft =
				btnOffset.left +
				this.props.btnRef.current.offsetWidth -
				(popupWidth + rootOffset.left);

			if (preferredLeft + rootOffset.left < 0) {
				preferredLeft = 10 - rootOffset.left;
			}

			// Now set the goddamn left value
			dropDown.style.left = `${preferredLeft}px`;
		}
		// We need to calculate if opened popup is too low
		if (
			// the height of popup + popoffset top > view port height
			popupHeight + popupOffsetTop - pageYOffset > clientHeight &&
			// If we are to position on top of button, then make sure page view can handle
			// so button offset top - popup height > 0
			btnOffset.top - popupHeight > 0
		) {
			// Now we position the popup on top of the button
			if (this.state.appendRoot === 'self') {
				// When appending to self, position should be relative to the
				// button height and popup height
				dropDown.style.top = `-${popupHeight - btnBorder}px`;
			} else {
				dropDown.style.top = `${btnOffset.top +
					btnBorder -
					popupHeight}px`; // 2px for border
			}
		}
	};

	render() {
		const portalClass = className(
			this.props.className,
			this.state.portalClasses,
		);
		const fipDropDownNode = (
			<div className={portalClass} ref={this.props.domRef}>
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
