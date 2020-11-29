import React from 'react';
import Terminal from '../src/components/terminal/Terminal';
import Code from '../src/components/code/Code';
import '../styles/get-started.scss';

const webpackCode = `const path = require('path');
const withSass = require('@zeit/next-sass');

const applyWebpackConfig = (test = /.jsx/) => {
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
});`;

const GetStartedPage = () => (
	<div className="section-gap">
		<div className="section-gap">
			<h2>Install</h2>
			<Terminal code="npm i @anephenix/ui" title="Install UI" />
		</div>
		<div className="section-gap">
			<h2>Dependencies</h2>
			<ul>
				<li>Node.js (version 12 and greater)</li>
				<li>React</li>
				<li>
					Sass (recommend installing @zeit/next-sass if using with
					Next.js)
				</li>
			</ul>
		</div>
		<div className="section-gap">
			<h2>Setup</h2>
			<p>
				In order to use Anephenix&apos;s React UI within your applications,
				you will need to do 2 things:
			</p>
			<ol>
				<li>
					Adjust your Webpack configuration in order to load the react
					components and compile them with sass as the CSS
					preprocessor.
				</li>
				<li>
					Wrap your React app in a higher-order-component in order to
					inherit the theme for the design system.
				</li>
			</ol>
			<p>Put this code in your next.config.js file:</p>
			<Code title="next.config.js" code={webpackCode} />
		</div>
	</div>
);

export default GetStartedPage;
