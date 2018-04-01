// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';

class FipSearch extends React.PureComponent {
	static propTypes = {
		handleSearch: PropTypes.func.isRequired,
		value: PropTypes.string.isRequired,
	};

	render() {
		return (
			<div className="rfipsearch">
				<input
					type="text"
					className="rfipsearch__input"
					value={this.props.value}
					onChange={this.props.handleSearch}
				/>
			</div>
		);
	}
}

export default FipSearch;
