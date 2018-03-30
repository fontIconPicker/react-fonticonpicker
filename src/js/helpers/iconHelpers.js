/**
 * Flatten a categorized source and return both categories and flattened items.
 * @param {Object} source The source object where key represent categories and it has array of items
 */
export function flattenPossiblyCategorizedSource(source) {
	// If it is an array
	if (Array.isArray(source)) {
		return {
			categories: [],
			flattened: [...source],
		};
	}
	// It is an object, let's assume that
	// if someone doesn't pass it, then it will produce error
	// which is intentional

	// create a copy because this is a pure function
	const sourceCopy = {...source};
	// create categories and flattened arrays
	let categories = [];
	let flattened = [];
	// loop over and add to the variables
	Object.keys(sourceCopy).forEach(cat => {
		categories = [...categories, cat];
		flattened = [...flattened, ...sourceCopy[cat]];
	});
	return {
		categories,
		flattened,
	};
}

export function searchSource(search, source) {
	// todo
}
