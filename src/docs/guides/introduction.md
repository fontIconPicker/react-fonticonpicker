> This is currently a **work in progress**. Please stay tuned.

React FontIconPicker is a [React Component](https://reactjs.org/docs/react-component.html)
for displaying an interface to pick fonts or SVG out of a collection. It has
built in support for:

* **Fuzzy Search** - Search icons by title.
* **Categorization** - Filter icons by category.
* **Pagination** - Show a sane amount of icons per page.
* **Multi Picker** - Pick a single icon or multiple icons.
* **Attribute Renderer** - Render icons by attribute `<i data-icomoon="&#xe100;"></i>`.
* **Class Renderer** - Render icons by class `<i class="fas fa-align-center"></i>`.
* **Custom Renderer** - Use your own function to return an icon or SVG.

This has been rewritten from scratch and it is not a wrapper around
[jQuery Font Icon Picker](https://fonticonpicker.github.io).

### TL;DR

1. Install FontIconPicker and dependencies from NPM.

```bash
npm install classnames prop-types react-transition-group @fonticonpicker/react-fonticonpicker --save
```

2. Bring in your webfonts (eg, icomoon or fontawesome).

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.9/css/all.css" integrity="sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1" crossorigin="anonymous">
```

3. Import FontIconPicker.

```js
import FontIconPicker from '@fonticonpicker/react-fonticonpicker
```

4. Initialize with source and optionally search.

```js
import React from 'react';

import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import '../node_modules/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '../node_modules/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';

import * as iconDefs from './helpers/iconDefs';

class App extends React.Component {
	state = {
		vFontAwesome: ['fab fa-accessible-icon', 'fas fa-rss'],
		vIcoMoon: 57571,
	};

	handleFontAwesome = values => {
		this.setState({ vFontAwesome: values });
	};

	handleIcoMoon = value => {
		this.setState({ vIcoMoon: value });
	};

	render() {
		return (
			<div className="intro-fips">
				<FontIconPicker
					onChange={this.handleFontAwesome}
					renderUsing="class"
					icons={iconDefs.fontAwesome}
					value={this.state.vFontAwesome}
					theme="bluegrey"
				/>
				<FontIconPicker
					onChange={this.handleIcoMoon}
					icons={iconDefs.icomoonIcons}
					search={iconDefs.icomoonIconsSearch}
					value={this.state.vIcoMoon}
					theme="teal"
					isMulti={false}
				/>
			</div>
		);
	}
}
```

The example above assumed you are using [create-react-app](https://github.com/facebook/create-react-app). You can check the guides for
more information.
