// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import ReactMarkdown from 'react-markdown';
import installation from '../../guides/installation.md';
import codeRenderer from '../CodeBlock';

const Installation = () => (
	<div className="fip-install">
		<ReactMarkdown
			source={installation}
			escapeHtml
			renderers={{
				code: codeRenderer,
			}}
		/>
	</div>
);

export default Installation;
