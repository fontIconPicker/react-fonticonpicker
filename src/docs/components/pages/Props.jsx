// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import ReactMarkdown from 'react-markdown';
import props from '../../guides/props.md';
import codeRenderer from '../CodeBlock';
import TableRenderer from '../TableRenderer';

const Props = () => (
	<div className="fip-props">
		<ReactMarkdown
			source={props}
			escapeHtml
			renderers={{
				code: codeRenderer,
				table: TableRenderer,
			}}
		/>
	</div>
);

export default Props;
