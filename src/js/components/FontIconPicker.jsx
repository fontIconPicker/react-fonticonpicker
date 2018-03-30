// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import PropTypes from 'prop-types';
import {flattenPossiblyCategorizedSource} from '../helpers/iconHelpers';

class FontIconPicker extends React.PureComponent {
	static propTypes = {
		icons: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array,
		]).isRequired,
		search: PropTypes.oneOfType([
			PropTypes.object,
			PropTypes.array,
		]),
		iconsPerPage: PropTypes.number,
		theme: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		showCategory: PropTypes.bool,
		showSearch: PropTypes.bool,
	};

	static defaultProps = {
		search: [],
		iconsPerPage: 20,
		theme: 'default',
		showCategory: true,
		showSearch: true,
	};

	constructor(props) {
		// Call the super
		super(props);
		// create the first state
		const flattenedSource = flattenPossiblyCategorizedSource(this.props.icons);
		const {categories, flattened: icons} = flattenedSource;
		const searchSource = flattenPossiblyCategorizedSource(this.props.search).flattened;

		// create the state
		this.state = {
			icons,
			searchSource,
			categories,
			currentPage: 0,
		};
	}

	render() {
		return (
			<div>
				<h1>This is so Awesome</h1>
				<p>FontIconPicker</p>
				<p>I am awesome... I guess</p>
			</div>
		);
	}
}

export default FontIconPicker;
