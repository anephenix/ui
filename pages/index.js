import React from 'react';
import Link from 'next/link';

const hero = {
	marginTop: '120px',
};

const lead = {
	fontSize: '16px',
	fontWeight: 300,
	marginBottom: '32px',
};

// TODO - move the custom css into a dedicate scss file
// or into components served by the UI library

module.exports = () => (
	<div style={{ marginTop: '40px' }}>
		<div style={hero}>
			<h1>UI</h1>
			<p style={lead}>A Design System for Anephenix</p>
			<Link href="get-started">
				<a className="button theme-default primary">Get started</a>
			</Link>
		</div>
	</div>
);
