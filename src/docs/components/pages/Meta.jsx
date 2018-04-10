// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import ReactMarkdown from 'react-markdown';
import meta from '../../guides/meta.md';
import codeRenderer from '../CodeBlock';
import TableRenderer from '../TableRenderer';

const Meta = () => (
	<div className="fip-meta">
		<ReactMarkdown
			source={meta}
			escapeHtml
			renderers={{
				code: codeRenderer,
				table: TableRenderer,
			}}
		/>
	</div>
);

export default Meta;
