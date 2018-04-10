### 3: Single and Multi Picker

The source codes below were used for populating the examples. Here we cleverly
destructure the `icons` from `props`. More on it [here](https://wesbos.com/destructuring-objects/).

```js
// For Single Picker
export const SinglePicker = ({icons}) => {
	return (
		<FontIconPicker
			icons={icons}
			value='fas fa-subway'
			onChange={(val) => console.log(val)}
		/>
	);
}
// For Multi Picker
export const MultiPicker = ({icons}) => {
	return (
		<FontIconPicker
			icons={icons}
			value={['fas fa-truck', 'fas fa-subway']}
			onChange={(val) => console.log(val)}
			isMulti
		/>
	);
}
```
