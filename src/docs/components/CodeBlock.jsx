import React from 'react';
import PropTypes from 'prop-types';
import Lowlight from 'react-lowlight';
import js from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';

Lowlight.registerLanguage('js', js);
Lowlight.registerLanguage('html', html);
Lowlight.registerLanguage('bash', bash);

const CodeBlock = props => (
	<Lowlight
		language={props.language || 'js'}
		value={props.value}
		inline={props.inline}
	/>
);

CodeBlock.displayName = 'codeBlock';
CodeBlock.propTypes = {
	value: PropTypes.string.isRequired,
	language: PropTypes.string,
	inline: PropTypes.bool,
};
CodeBlock.defaultProps = {
	language: 'js',
	inline: false,
};

export default CodeBlock;
