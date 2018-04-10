import React from 'react';
import PropTypes from 'prop-types';

import SyntaxHighlighter, {
	registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import html from 'react-syntax-highlighter/languages/prism/markup';
import bash from 'react-syntax-highlighter/languages/prism/bash';
import scss from 'react-syntax-highlighter/languages/prism/scss';
import tomorrow from 'react-syntax-highlighter/styles/prism/tomorrow';

registerLanguage('js', jsx);
registerLanguage('jsx', jsx);
registerLanguage('html', html);
registerLanguage('bash', bash);
registerLanguage('scss', scss);

const CodeBlock = props => (
	<SyntaxHighlighter
		language={props.language || 'js'}
		style={tomorrow}
		customStyle={{
			maxHeight: '300px',
		}}
	>
		{props.value}
	</SyntaxHighlighter>
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
