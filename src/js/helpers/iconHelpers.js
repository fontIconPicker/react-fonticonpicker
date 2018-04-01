/**
 * Flatten a categorized source and return both categories and flattened items.
 * @param {object} source The source object where key represent categories and it has array of items
 *
 * @return {array} Flattened source. Could be an empty array if none was found
 */
export function flattenPossiblyCategorizedSource(source, category = null) {
	// If it is an array
	if (Array.isArray(source)) {
		return [...source];
	}
	// It is an object, let's assume that
	// if someone doesn't pass it, then it will produce error
	// which is intentional

	// Now check if category is null
	if (category !== null) {
		// just return the inner array if it is present
		// else return an empty array
		return source[category] !== undefined ? [...source[category]] : [];
	}

	// create flattened arrays
	let flattened = [];
	// copy the source, since this is a pure function
	const sourceCopy = { ...source };

	// loop over and add to the variables
	Object.keys(sourceCopy).forEach(cat => {
		flattened = [...flattened, ...sourceCopy[cat]];
	});
	return flattened;
}

/**
 * Get possible categories from an icon source
 *
 * @param {object|array} source
 * @return {array|null} Category array. Null if no category was found
 */
export function getPossibleCategories(source) {
	// If it is an array, then no category
	if (Array.isArray(source)) {
		return null;
	}
	// get object keys and return them as source
	return Object.keys(source);
}

/**
 * FuzzySearch Implementation
 *
 * {@link https://github.com/bevacqua/fuzzysearch}
 * The MIT License (MIT)
 * Copyright © 2015 Nicolas Bevacqua
 * @param {string} needle
 * @param {string} haystack
 */
/* eslint-disable */
export function fuzzySearch(needle, haystack) {
	let hlen = haystack.length;
	let nlen = needle.length;
	if (nlen > hlen) {
		return false;
	}
	if (nlen === hlen) {
		return needle === haystack;
	}
	outer: for (let i = 0, j = 0; i < nlen; i++) {
		let nch = needle.charCodeAt(i);
		while (j < hlen) {
			if (haystack.charCodeAt(j++) === nch) {
				continue outer;
			}
		}
		return false;
	}
	return true;
}
/* eslint-enable */
