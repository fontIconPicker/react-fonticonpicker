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
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';
```

4. Initialize with source and optionally search.

```js
import React, { Component } from 'react';
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import logo from './logo.svg';
import './App.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'fipicon-angle-left',
    };
  }
  handleChange = (value) => {
    this.setState({ value });
  }
  render() {
    const props = {
      icons: ['fipicon-angle-left', 'fipicon-angle-right', 'fipicon-angle-up', 'fipicon-angle-down'],
      theme: 'bluegrey',
      renderUsing: 'class',
      value: this.state.value,
      onChange: this.handleChange,
      isMulti: false,
    };
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FontIconPicker {...props} />
      </div>
    );
  }
}

export default App;
```

The example above assumed you are using [create-react-app](https://github.com/facebook/create-react-app). The source of `iconDefs` can be
found [here](https://github.com/fontIconPicker/react-fonticonpicker/blob/master/src/docs/helpers/iconDefs.js). You can check the guides for more information.
