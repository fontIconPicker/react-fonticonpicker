## Installation and Setup

The preferred way to install [`FontIconPicker`](https://www.npmjs.com/package/@fonticonpicker/react-fonticonpicker) is
through npm. You are probably using it anyway for your project. So add fonticonpicker as your dependency.

### Install using NPM

```bash
npm install --save @fonticonpicker/react-fonticonpicker
```

Now you can import the component class and styles.

#### ES6 Style Import

```js
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
```

#### ES5 Style Import

```js
const FontIconPicker = require('@fonticonpicker/react-fonticonpicker');
```

#### Import the css files

If you are using [webpack](https://webpack.js.org) with style loader, then you
can easily do something like

```js
import './node_modules/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import './node_modules/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';
```

pointing to the relative path of `node_modules` directory.

If you are not using webpack, then you simply include the css file in your build
tool. For example, in your application's main `scss` file:

```scss
@import './node_modules/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
@import './node_modules/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';
```

Or if you want to use the style files directly:

```html
<link rel="stylesheet" type="text/css" media="screen"  href="./node_modules/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css" />
<link rel="stylesheet" type="text/css" media="screen"  href="./node_modules/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css" />
```

As you have noticed, there are two CSS files required:

1. `base-theme`: Includes the basic layout style for fonticonpicker to work.
   It does not have any coloring or theming.
2. `material-theme`: Includes theming for all the styles in this demo.

### Use with CDN

For some reason, if you'd prefer the CDN, then it is available at [unpkg.com](https://unpkg.com/@fonticonpicker/react-fonticonpicker/dist/).

Place them in your HTML document, along with UMD builds of peer dependencies.

```html
<!-- Styles -->
<link rel="stylesheet" type="text/css" media="screen" href="https://unpkg.com/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css" />
<link rel="stylesheet" type="text/css" media="screen" href="https://unpkg.com/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css" />
<!-- Scripts -->
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script crossorigin src="https://unpkg.com/classnames@2.2.5/index.js"></script>
<script crossorigin src="https://unpkg.com/prop-types@15.6.1/prop-types.min.js"></script>
<script crossorigin src="https://unpkg.com/react-transition-group@2.3.0/dist/react-transition-group.min.js"></script>
<script crossorigin src="https://unpkg.com/@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.react.js"></script>
```

### Download Source

We distribute production version of source file through [github releases](https://github.com/fontIconPicker/react-fonticonpicker/releases). Head over there
and download `fonticonpicker.react.zip` file.

Now extract the zip and use the source as you would use from CDN.
