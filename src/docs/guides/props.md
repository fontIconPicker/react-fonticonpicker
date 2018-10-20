## Props Guide

The following props are available for `FontIconPicker` customization.

### `icons`

| Required | Type | Default |
| ---------| -----| --------|
| yes | `Object` or `Array`| N/A |

Define the icons source. It can be any of the following type.

```js
// Objects
const iconObj = {
	Foo: ['foo', 'bar']
	Bar: ['biz', 'fop']
}
// Array
const iconArr = ['foo', 'bar'];
```

### `search`

| Required | Type | Default |
| ---------| -----| --------|
| no | `Object` or `Array`| null |

When provided, should match the same structure of the `icons`. It is used to search
through icons.

```js
// Objects
const iconObj = {
	Foo: ['Looking for foo', 'Looking for bar']
	Bar: ['Looking for biz', 'Looking for fop']
}
// Array
const iconArr = ['Looking for foo', 'Looking for bar'];
```

This is useful when passing `number` through `icons`. For example:

```js
<FontIconPicker
	onChange={this.handleIcoMoon}
	icons={iconDefs.icomoonIcons}
	search={iconDefs.icomoonIconsSearch}
	value={this.state.vIcoMoon}
	theme="teal"
	isMulti={false}
	renderUsing="data-icomoon"
/>
```

See [this](https://github.com/fontIconPicker/react-fonticonpicker/blob/master/src/docs/helpers/iconDefs.js) for `iconDefs`.

### `iconsPerPage`

| Required | Type | Default |
| ---------| -----| --------|
| no | `number`| 20 |

Define how many icons will be shown per page.

### `theme`

| Required | Type | Default |
| ---------| -----| --------|
| no | `string`| `'default'` |

Add a modifier class to `FontIconPicker`, `FipButton` and `FipDropDownPortal`
children components.

Then you can theme it with custom styling. Use the following starter template.

```js
<FontIconPicker
	onChange={this.handleIcoMoon}
	icons={iconDefs.icomoonIcons}
	search={iconDefs.icomoonIconsSearch}
	value={this.state.vIcoMoon}
	theme="custom"
	isMulti={false}
	renderUsing="data-icomoon"
/>
```

```scss
$theme: 'custom'
// Button
.rfipbtn--#{$theme} {
	background-color: $btn-bg-color;
	border: 1px solid $btn-border-color;

	&:active,
	&:focus {
		@include card(1);
		border: 1px solid $btn-bg-hover-color;
	}

	// dropdown button
	.rfipbtn {
		&__button {
			border: 0 none transparent;
			border-left: 1px solid $btn-border-color;
			background-color: $btn-bg-dd-color;
			color: $icon-text;

			&:hover {
				background-color: $btn-bg-hover-color;
			}

			&:active {
				box-shadow: inset 0 0 10px 0 $btn-bg-active-color;
			}
		}

		// icon
		&__icon {
			border: 1px solid $icon-border-color;
			color: $icon-text;

			// empty
			&--empty {
				color: $empty-icon-color;
			}
		}

		// del
		&__del {
			background-color: $del-bg-color;

			&:hover {
				background-color: $del-bg-hover-color;
			}

			&:focus,
			&:active {
				outline: 1px solid $del-bg-hover-color;
			}
		}
	}
}

.rfipdropdown--#{$theme} {
	@include card(5);
	color: $text;

	input,
	select {
		color: $text;
	}

	background-color: $color-background;
	border: 1px solid $btn-border-color;
	// Category item
	.rfipcategory {
		select {
			background-color: $color-background;
			@include input($elem-border-color, $elem-border-focus-color);
		}
	}

	// Icons box
	.rfipicons {
		// current page
		&__cp {
			@include input($elem-border-color, $elem-border-focus-color);
		}

		&__left,
		&__right {
			background-color: $pager-bg-color;
			border: 1px solid $pager-bg-color;
			color: $icon-text;
			&:hover {
				background-color: $pager-bg-hover-color;
				border: 1px solid $pager-bg-hover-color;
			}
			&:focus,
			&:active {
				border: 1px solid $pager-bg-hover-color;
			}
		}

		// Individual icon box
		&__ibox {
			background-color: $ibox-bg-color;
			border: 1px solid $ibox-bg-color;
			color: $icon-text;
			&:hover {
				background-color: $ibox-bg-hover-color;
				border: 1px solid $ibox-bg-hover-color;
			}
			&:focus,
			&:active {
				border: 1px solid $ibox-bg-hover-color;
			}
			&--error {
				color: $error-icon-color;
			}
		}

		// Invidual icons
		&__icon {
			// selected
			&--selected {
				.rfipicons__ibox {
					background-color: $ibox-bg-selected-color;
				}
			}
		}
	}

	// Search
	.rfipsearch {
		input {
			@include input($elem-border-color, $elem-border-focus-color);
		}
	}
}
```

### `onChange`

| Required | Type | Default |
| ---------| -----| --------|
| yes | `func`| N/A |

A function which will receive the new `value` on change. Use it to sync values
with your state.

```js
class MyComponent extends React.Component {
	state = {
		vFontAwesome: ['fab fa-accessible-icon', 'fas fa-rss'],
	};

	handleFontAwesome = values => {
		this.setState({ vFontAwesome: values });
	};

	render() {
		return (
			<div className="fip-intro">
				<FontIconPicker
					onChange={this.handleFontAwesome}
					renderUsing="class"
					icons={iconDefs.fontAwesome}
					value={this.state.vFontAwesome}
					theme="bluegrey"
				/>
				<p>Current: {this.state.vFontAwesome}</p>
			</div>
		);
	}
}

export default MyComponent;
```

### `showCategory`

| Required | Type | Default |
| ---------| -----| --------|
| no | `bool`| `true` |

Set to `false` to disable showing category.

### `showSearch`

| Required | Type | Default |
| ---------| -----| --------|
| no | `bool`| `true` |

Set to `false` to disable showing search.

### `value`

| Required | Type | Default |
| ---------| -----| --------|
| yes | `array` or `string` or `number` | `null` |

The current value of `FontIconPicker`. If you are referring to a `state`, then
make sure to use `onChange` to sync it.

### `isMulti`

| Required | Type | Default |
| ---------| -----| --------|
| no | `bool`| `false` |

Set to `true` to have the element pick multiple icons.

### `renderUsing`

| Required | Type | Default |
| ---------| -----| --------|
| no | `string`| `'class'` |

When the value is `"class"`, the value of the icon is put inside `className`.

```jsx
<i className={value} />
```

For anything else, it creates an attribute.

```jsx
const attributes = {
	[this.props.renderUsing]: value,
};
return (
	<i {...attributes} />
);
```

You can pass any `data` attributes, like `renderUsing="data-icomoon"`.

### `convertHex`

| Required | Type | Default |
| ---------| -----| --------|
| no | `bool`| `true` |

When `renderUsing` is not `"class"`, then this props determines, whether the value
of the icon should be rendered directly, or it should be converted to `fromCodePoint`.

In the examples, for `"data-icomoon"` attribute, we have passed decimal values
directly along with `convertHex={true}`. Internally `FontIconPicker` does a
`String.fromCodePoint(value)` to actually get the unicode character for rendering
the font.

### `renderFunc`

| Required | Type | Default |
| ---------| -----| --------|
| no | `func`| `null` |

A custom render method which can be used to generate any output for the icons.

It should return react elements (JSX).

```js
const renderSVG = svg => (
	<svg>
		<use xlinkHref={`#${svg}`} />
	</svg>
);
const MyComponent = () => {
	return (
		<FontIconPicker
			icons={iconDefs.svgs}
			value={['004-green_lantern', '066-daredevil_glasses']}
			onChange={val => val}
			renderFunc={renderSVG}
			theme="indigo"
			isMulti
		/>
	);
}
export default MyComponent;
```

### `appendTo`

| Required | Type | Default |
| ---------| -----| --------|
| no | `string` or `bool` | `false` |

When `false`, the dropdown portal appends natually to the main component.

When anything else, the portal tries to append to `document.querySelector(this.props.appendTo)`.
So you should either pass in `false`, or a valid query selector.

### `allCatPlaceholder`

| Required | Type | Default |
| ---------| -----| --------|
| no | `string` | `"Show from all"` |

Placeholder for all categories option.

### `searchPlaceholder`

| Required | Type | Default |
| ---------| -----| --------|
| no | `string` | `"Search Icons"` |

Placeholder for search input.

### `noIconPlaceholder`

| Required | Type | Default |
| ---------| -----| --------|
| no | `string` | `"No icons found"` |

Placeholder shown when no icons are present in the dropdown.

### `noSelectedPlaceholder`

| Required | Type | Default |
| ---------| -----| --------|
| no | `string` | `"Select icon"` |

Placeholder for empty icon value.

### `closeOnSelect`

| Required | Type | Default |
| ---------| -----| --------|
| no | `boolean` | `false` |

Whether to automatically close the dropdown on selecting an icon.
