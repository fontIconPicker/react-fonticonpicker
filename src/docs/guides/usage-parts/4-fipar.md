### 4: Attribute Rendering

By default `FontIconPicker` sets `convertHex` to `true`. We need that because
the icon values are not in unicode, rather its decimal value. Internally `FontIconPicker`
will convert the decimal values to string code at that value. For this we use `String.fromCodePoint`.

Since we pass only `numbers` with `icons`, we also pass an additional `search`
prop to use the search field effectively.

```js
const MyComponent = () => {
	const icons = [
		57436,
		57437,
		57438,
		57439,
		57524,
		57525,
		57526,
		57527,
	];
	const search = [
		'Box add',
		'Box remove',
		'Download',
		'Upload',
		'List',
		'List 2',
		'Numbered list',
		'Menu',
	];
	return (
		<FontIconPicker
			icons={icons}
			search={search}
			value={[57436, 57437]}
			onChange={(val) => console.log(val)}
			isMulti
			renderUsing="data-icomoon"
			convertHex={true} // this isn't needed
		/>
	);
}
export default MyComponent;
```
