// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import ReactMarkdown from 'react-markdown';
import installation from '../../guides/installation.md';
import codeRenderer from '../CodeBlock';
import pkg from '../../../../package.json';

const Installation = () => (
	<div className="fip-install">
		<ReactMarkdown
			source={installation}
			escapeHtml
			renderers={{
				code: codeRenderer,
			}}
		/>
		<h3>peerDependencies</h3>
		<p>FontIconPicker has the following dependencies.</p>
		<div className="list-group">
			{Object.keys(pkg.peerDependencies).map(dep => (
				<a
					key={dep}
					href={`https://www.npmjs.com/package/${dep}`}
					className="list-group-item d-flex justify-content-between align-items-center"
				>
					<code>{dep}</code>
					<span className="badge badge-primary badge-pill">
						{pkg.peerDependencies[dep]}
					</span>
				</a>
			))}
		</div>
	</div>
);

export default Installation;
