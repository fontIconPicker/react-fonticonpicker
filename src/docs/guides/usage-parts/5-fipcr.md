### 5: Custom Renderer (SVG)

Here we use a custom render function to print some SVG inside the picker element.
Due to many ways of actually rendering SVGs (inline, with sprite, img tags etc)
I have decided not to throw an actual `renderUsing='svg'` prop. Rather use the
`renderFunc` prop to print SVGs on the go.

The source code below assumes that you have the SVG from [here](https://github.com/fontIconPicker/react-fonticonpicker/blob/master/src/docs/assets/superhero.svg)
printed directly after the opening `<body>` of your HTML.

Notice we return JSX or React Element from the function.

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
