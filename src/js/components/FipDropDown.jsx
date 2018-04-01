// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';

class FipDropDown extends React.PureComponent {
	static propTypes = {
		icons: PropTypes.arrayOf(PropTypes.string).isRequired,
		searchSource: PropTypes.arrayOf(PropTypes.string).isRequired,
		categories: PropTypes.arrayOf(PropTypes.string),
		value: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.number),
		]).isRequired,
		currentPage: PropTypes.number.isRequired,
		iconsPerPage: PropTypes.number.isRequired,
		maxColumnsPerPage: PropTypes.number.isRequired,
		showCategory: PropTypes.bool.isRequired,
		showSearch: PropTypes.bool.isRequired,
	};

	static defaultProps = {
		categories: null,
	};

	constructor(props) {
		super(props);
		// set state
		this.state = {};
	}
}

export default FipDropDown;
