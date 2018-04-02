// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import PropTypes from 'prop-types';

class FipCategory extends React.PureComponent {
	static propTypes = {
		handleCategory: PropTypes.func.isRequired,
		value: PropTypes.number.isRequired,
		categories: PropTypes.arrayOf(PropTypes.string).isRequired,
	};

	render() {
		return (
			<div className="rfipcategory">
				<select
					className="rfipcategory__select"
					onChange={this.props.handleCategory}
					value={this.props.value}
				>
					{this.props.categories.map((value, index) => (
						<option
							className="rfipcategory__select__option"
							key={value}
							value={index}
						>
							{value}
						</option>
					))}
				</select>
			</div>
		);
	}
}

export default FipCategory;
