## Development Environment

Development & Build is done with the help of [webpack](https://webpack.js.org/).

First fork and git clone the repo on your machine.

```bash
git clone git@github.com:<username>/react-fonticonpicker.git
```

Now install all the dependencies. Make sure you have [nodejs](https://nodejs.org/en/)
version 9 or higher.

```bash
npm install
```

Now run the server with

```bash
npm start
```

This will open a webpack dev server with hot reload. You can access the server
from [http://localhost:7770](http://localhost:7770).

Now make changes in the component and see it live. Also add unit tests and
integration tests where applicable.

If your changes invalidates snapshots, then make sure to update them too (with
good reasons).

When doing a PR, try not to build the docs or the dist. It will create unnecessary
merge conflict.

Other npm commands at disposal:

* `npm run test`: Runs `eslint` followed by `stylelint` and `jest` tests.
* `npm run start`: Runs a dev server with hot reload.
* `npm run docs`: Builds the docs for production.
* `npm run build`: Builds the UMD & CSS files for distribution.

## Credits

React FontIconPicker has been developed by [Swashata](https://swashata.me) mainly for in use with [eForm](https://eform.live).
The original idea came from [jQuery FontIconPicker](https://github.com/fontIconPicker/fontIconPicker)
by [Alessandro Benoit](http://codeb.it).

None of these would have been possible without the cool [Wes Bos 🔥](https://wesbos.com/)
and his [react for beginners course](https://reactforbeginners.com/). It is awesome 😉.
