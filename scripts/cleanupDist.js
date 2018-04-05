// Copyright (c) 2018 Swashata Ghosh <swashata@wpquark.com>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// ------------------ CAUTION ------------------//
// ALWAYS RUN THIS FILE WHERE package.json IS  //
//          OTHERWISE IT WILL NOT WORK         //
// ------------------ CAUTION ------------------//

const fs = require('fs');

// Clean up files written by webpack
// They don't have streamlined CSS support
// yet, when they do, we will remove this
// using rollup and node-sass isn't worth it
// right now, so we do this bit manually
const filesToRemove = [
	'./dist/base-theme.react.js.map',
	'./dist/base-theme.react.js',
	'./dist/material-theme.react.js.map',
	'./dist/material-theme.react.js',
];

// Remove files
filesToRemove.forEach(file => {
	fs.unlink(file, err => {
		if (err) {
			console.error(`couldn't remove ${file}`);
			console.error(err);
		} else {
			console.log(`Removed file ${file}`);
		}
	});
});

// Now copy the index.html too
fs.copyFile('./scripts/index.html', './dist/index.html', err => {
	if (err) {
		console.error(`couldn't copy index.html file.`);
		console.error(err);
	} else {
		console.log('Copied index.html file');
	}
});
