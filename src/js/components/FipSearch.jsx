// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';

const FipSearch = props => (
	<div className="rfipsearch">
		<input
			type="text"
			className="rfipsearch__input"
			value={props.value}
			onChange={props.handleSearch}
			placeholder={props.placeholder}
		/>
	</div>
);
FipSearch.propTypes = {
	handleSearch: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
};

export default FipSearch;
