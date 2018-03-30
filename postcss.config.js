module.exports = {
	sourceMap: true,
	plugins: {
	  'autoprefixer': {
			browsers: 'last 2 versions',
	  },
	  'cssnano': {
			preset: 'default',
			reduceIdents: false,
			zindex: false,
			mergeIdents: false,
			discardUnused: false,
	  },
	},
};
