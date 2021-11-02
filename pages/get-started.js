import React from 'react';
import { Terminal, Code } from '../dist';

const webpackCode = `const path = require('path');

const applyWebpackConfig = (test = /.jsx/) => {
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
};`;

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
				<li>Sass (V 5.0+)</li>
			</ul>
		</div>
		<div className="section-gap">
			<h2>Setup</h2>
			<p>
				In order to use Anephenix&apos;s React UI within your
				applications, you will need to put this code in your
				next.config.js file:
			</p>
			<Code title="next.config.js" code={webpackCode} />
		</div>
	</div>
);

export default GetStartedPage;
