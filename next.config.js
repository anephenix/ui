const path = require('path');
const withSass = require('@zeit/next-sass');

const applyWebpackConfig = (test = /\.jsx/) => {
	return (config, options) => {
		config.module.rules.push({
			test,
			use: [options.defaultLoaders.babel],
		});
		return config;
	};
};

module.exports = withSass({
	sassLoaderOptions: {
		sassOptions: {
			includePaths: [
				path.resolve('node_modules'),
				path.resolve('src/components'),
				path.resolve('design-system'),
			],
		},
	},
	webpack: applyWebpackConfig(),
});
