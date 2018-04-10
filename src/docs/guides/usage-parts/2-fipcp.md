### 2: Categorized Picker

If you would like to show categories inside the picker, then make your `icons` a
plain object.

```js
const icons = {
	'Users & People': [
		'fab fa-accessible-icon',
		'fas fa-address-book',
		'far fa-address-book',
		'fas fa-address-card',
		'far fa-address-card',
		'fas fa-bed',
		'fas fa-blind',
		'fas fa-child',
		'fas fa-female',
		'fas fa-frown',
		'far fa-frown',
		'fas fa-id-badge',
		'far fa-id-badge',
		'fas fa-id-card',
		'far fa-id-card',
		'fas fa-male',
		'fas fa-meh',
		'far fa-meh',
		'fas fa-power-off',
		'fas fa-smile',
		'far fa-smile',
		'fas fa-street-view',
		'fas fa-user',
		'far fa-user',
		'fas fa-user-circle',
		'far fa-user-circle',
		'fas fa-user-md',
		'fas fa-user-plus',
		'fas fa-user-secret',
		'fas fa-user-times',
		'fas fa-users',
		'fas fa-wheelchair',
	],
	Vehicles: [
		'fab fa-accessible-icon',
		'fas fa-ambulance',
		'fas fa-bicycle',
		'fas fa-bus',
		'fas fa-car',
		'fas fa-fighter-jet',
		'fas fa-motorcycle',
		'fas fa-paper-plane',
		'far fa-paper-plane',
		'fas fa-plane',
		'fas fa-rocket',
		'fas fa-ship',
		'fas fa-shopping-cart',
		'fas fa-space-shuttle',
		'fas fa-subway',
		'fas fa-taxi',
		'fas fa-train',
		'fas fa-truck',
		'fas fa-wheelchair',
	],
};
const MyComponent = () => {
	return (
		<FontIconPicker
			icons={icons}
			value={['fas fa-truck', 'fas fa-subway']}
			onChange={(val) => console.log(val)}
			isMulti
		/>
	);
}
export default MyComponent;
```
