# UI

A design system for Next.js applications, using Sass as the CSS preprocessor.

[![Node.js CI](https://github.com/anephenix/ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/anephenix/ui/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/anephenix/ui/badge.svg?branch=master)](https://coveralls.io/github/anephenix/ui?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/ad75e2ac73c6a033d922/maintainability)](https://codeclimate.com/github/anephenix/ui/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ad75e2ac73c6a033d922/test_coverage)](https://codeclimate.com/github/anephenix/ui/test_coverage)

### Installation

```
npm i @anephenix/ui --save
```

### Dependencies

-   Node.js (14+)
-   React (Version 17)
-   Sass (V 5.0+)

### Setup

In order to use Anephenix's React UI within your Next.js applications, you will need to adjust your Webpack configuration in order to load the react components.

Make sure that the next.config.js file for your Next.js app has this code:

```javascript
const applyWebpackConfig = (test = /\.jsx/) => {
	return (config, options) => {
		config.module.rules.push({
			test,
			use: [options.defaultLoaders.babel],
		});
		return config;
	};
};

module.exports = {
	webpack: applyWebpackConfig(),
};
```

The `applyWebpackConfig` function ensures that you can load the React components from the node_modules folder.

### Usage

To be fleshed out. See [the site](https://ui.anephenix.com) for details.

### tests

```
npm t
```

### License and credits

&copy;2021 Anephenix OÜ. UI is licenced under the MIT Licence.
