// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
	static propTypes = {
		location: PropTypes.shape({
			pathname: PropTypes.string,
		}).isRequired,
		children: PropTypes.node.isRequired,
	};
	componentDidUpdate(prevProps) {
		const { location: { pathname: currentPath } } = this.props;
		const { location: { pathname: prevPath } } = prevProps;
		const cpParts = currentPath.split('/');
		const ppParts = prevPath.split('/');
		if (
			// pathname has changed
			currentPath !== prevPath &&
			// and current pathname and previous pathname does not share something common
			cpParts[1] !== ppParts[1]
		) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);
