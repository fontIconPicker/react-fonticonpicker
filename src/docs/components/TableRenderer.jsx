// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import PropTypes from 'prop-types';

const TableRenderer = props => (
	<table className="table">{props.children}</table>
);

TableRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TableRenderer;
