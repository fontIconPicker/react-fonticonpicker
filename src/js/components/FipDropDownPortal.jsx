// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import className from 'classnames';

class FipDropDownPortal extends React.PureComponent {
	static propTypes = {
		appendRoot: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]), // eslint-disable-line
		children: PropTypes.node.isRequired,
		domRef: PropTypes.object.isRequired, // eslint-disable-line
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
