## Usage Guide

To use fonticonpicker, you essentially need one thing, `icons` props. It can
be an `array` for non-categorized picker or an `plain object` for categorized
icon picker.

### Required Props

`FontIconPicker` requires only three props.

1. `icons`: Source of icons, could be an array or an object.
2. `onChange`: Function to call on value change.
3. `value`: Initial value. Should be an array for multi type or a string or number for single type.

By default, `FontIconPicker` tries to render using `class`. So whatever you pass
through `icons`, will be used like `<i class={icon}>`. This works good with
fontawesome, icomoon etc. For some reason, if you want to use a custom attribute
and convert the values to `hex`, then follow the examples.

Also, `FontIconPicker` defaults to `isMulti` to `true`. So it provides you an
interface to pick multiple icons. Also it expects the `value` to be an `array`.
You can disable this by passing `isMulti={false}`.
