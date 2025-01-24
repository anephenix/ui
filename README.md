# UI

A design system for Next.js applications, using Sass as the CSS preprocessor.

[![npm version](https://badge.fury.io/js/%40anephenix%2Fui.svg)](https://badge.fury.io/js/%40anephenix%2Fui) [![Node.js CI](https://github.com/anephenix/ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/anephenix/ui/actions/workflows/node.js.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/ad75e2ac73c6a033d922/maintainability)](https://codeclimate.com/github/anephenix/ui/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ad75e2ac73c6a033d922/test_coverage)](https://codeclimate.com/github/anephenix/ui/test_coverage) [![Socket Badge](https://socket.dev/api/badge/npm/package/@anephenix/ui)](https://socket.dev/npm/package/@anephenix/ui)

### Installation

```
npm i @anephenix/ui --save
```

### Dependencies

-   Node.js (22+)
-   React (Version 18+)
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

&copy;2025 Anephenix OÜ. UI is licenced under the MIT Licence.
