# UI

A design system for Next.js applications, using Sass as the CSS preprocessor.

[![CircleCI](https://circleci.com/gh/anephenix/ui.svg?style=shield)](https://circleci.com/gh/anephenix/ui) [![Coverage Status](https://coveralls.io/repos/github/anephenix/ui/badge.svg?branch=master)](https://coveralls.io/github/anephenix/ui?branch=master)

### Installation

```
npm i @anephenix/ui --save
```

### Dependencies

-   Node.js (12)
-   React (Version 16)
-   Sass Lang (recommend installing @zeit/next-sass if using with Next.js)

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
	sassLoaderOptions: {
		sassOptions: {
			includePaths: [path.resolve('node_modules')],
		},
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
import { Theme } from '@anephenix/ui';

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
				<Theme>
					<Component {...pageProps} />
				</Theme>
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
