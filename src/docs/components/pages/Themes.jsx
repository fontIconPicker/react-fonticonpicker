// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import React from 'react';
import CodeBlock from '../CodeBlock';
import FontIconPicker from '../../../js/FontIconPicker';
import * as iconDefs from '../../helpers/iconDefs';

const Themes = () => (
	<div>
		<h2>
			<code>FontIconPicker</code> Themes
		</h2>
		<p>
			Below are 14 prebuilt themes packed with <code>FontIconPicker</code>.
		</p>
		<p>To use them, import the styles from your script.</p>

		<CodeBlock
			language="js"
			value={`import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';`}
		/>

		<p>
			Now initiatie <code>FontIconPicker</code> with the{' '}
			<code>theme</code> props.
		</p>

		<CodeBlock
			language="js"
			value={`<FontIconPicker
	icons={iconDefs.superHeroIcons}
	search={iconDefs.superHeroSearch}
	value={[]}
	onChange={v => v}
	isMulti
	theme="bluegrey"
/>`}
		/>

		<ul className="list-group">
			{[
				'bluegrey',
				'blue',
				'brown',
				'cyan',
				'deeporange',
				'deeppurple',
				'default',
				'indigo',
				'lightblue',
				'orange',
				'pink',
				'purple',
				'red',
				'teal',
			].map(theme => (
				<li
					className="list-group-item d-flex justify-content-between align-items-center"
					key={theme}
				>
					<FontIconPicker
						icons={iconDefs.superHeroIcons}
						search={iconDefs.superHeroSearch}
						value={[]}
						onChange={v => v}
						isMulti
						theme={theme}
						noSelectedPlaceholder={`${theme} theme`}
					/>
					<span className="badge badge-light badge-pill">
						<code>{theme}</code>
					</span>
				</li>
			))}
		</ul>
	</div>
);

export default Themes;
