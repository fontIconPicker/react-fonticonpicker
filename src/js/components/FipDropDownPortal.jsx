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
		appendRoot: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
		children: PropTypes.node.isRequired,
		domRef: PropTypes.object.isRequired, // eslint-disable-line
	};

	static defaultProps = {
		appendRoot: false,
	};

	constructor(props) {
		super(props);

		// where to append the dropdown?
		let appendRoot = 'self';
		const portalClasses = className('rfipdropdown', {
			'rfipdropdown--portal': this.props.appendRoot !== false,
		});
		if (this.props.appendRoot !== false) {
			// fip assumes that the node is already in the DOM tree
			// we definitely wan't to use something like body or another
			// root level stuff to apply our style?
			// let me know if a use case of detached dom arrives
			appendRoot = document.querySelector(this.props.appendRoot);
		}

		// set state where to attach
		this.state = {
			appendRoot,
			portalClasses,
		};
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
