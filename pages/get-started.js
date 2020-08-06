import React from 'react';

const section = {
	padding: '20px 0px',
};

const GetStartedPage = () => (
	<>
		<div style={section}>
			<h2>Install</h2>
			<pre>
				<code>npm i @anephenix/ui</code>
			</pre>
		</div>
		<div style={section}>
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
		<div style={section}>
			<h2>Setup</h2>
			<p>
				In order to use Anephenix's React UI within your applications,
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
			<pre>
				<code>TODO - next.config.js code goes here</code>
			</pre>
		</div>
	</>
);

export default GetStartedPage;
