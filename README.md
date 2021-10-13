# UI

A design system for Next.js applications, using Sass as the CSS preprocessor.

[![Node.js CI](https://github.com/anephenix/ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/anephenix/ui/actions/workflows/node.js.yml) [![Coverage Status](https://coveralls.io/repos/github/anephenix/ui/badge.svg?branch=master)](https://coveralls.io/github/anephenix/ui?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/ad75e2ac73c6a033d922/maintainability)](https://codeclimate.com/github/anephenix/ui/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/ad75e2ac73c6a033d922/test_coverage)](https://codeclimate.com/github/anephenix/ui/test_coverage)

### Installation

```
npm i @anephenix/ui --save
```

### Dependencies

-   Node.js (14 +)
-   React (Version 17)
-   Sass (V 5.0+)

### Setup

In order to use Anephenix's React UI within your applications, you will need to do 2 things:

1 - Adjust your Webpack configuration in order to load the react components and compile them with sass as the CSS preprocessor.
2 - Wrap your React app in a higher-order-component in order to inherit the theme for the design system.

#### Step 1

Make sure that the next.config.js file for your Next.js app has this code:

```javascript
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
	sassOptions: {
		includePaths: [path.resolve('node_modules')],
	},
	webpack: applyWebpackConfig(),
});
```

The sassLoader options configuration allows next-sass to compile the CSS from files that are sourced from the node_modules folder.
The `applyWebpackConfig` function ensures that you can load the React components from the node_modules folder.

By default, `applyWebpackConfig` will look for .jsx files in the @anephenix/ui npm package.

#### Step 2

In your pages/\_app.js file, wrap the page components with a `<Theme>` component, like in the example below:

```javascript
import App from 'next/app';
import React from 'react';
import Head from 'next/head';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<title>My App</title>
				</Head>
				<Component {...pageProps} />
			</>
		);
	}
}
export default MyApp;
```

The `<Theme>` component is a higher order component that ensure that the Sass files are loaded that apply global styling rules for the design system.

### Usage

To be fleshed out. See [the site](https://ui.anephenix.com) for details.

### tests

```
npm t
```

### License and credits

&copy;2020 Anephenix OÜ. UI is licenced under the MIT Licence.
