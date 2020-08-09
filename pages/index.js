import React from 'react';
import Link from 'next/link';

const hero = {
	marginTop: '60px',
};

const heroH1 = {
	marginTop: '240px',
	fontSize: '64px',
	lineHeight: '1em',
};

const lead = {
	fontSize: '18px',
	fontWeight: 400,
	marginBottom: '32px',
};

const ctas = {
	display: 'flex',
	width: '300px',
	justifyContent: 'space-between',
};

const headHeadingAndLead = {
	marginBottom: '200px',
};

// TODO - move the custom css into a dedicate scss file
// or into components served by the UI library

const HomePage = () => (
	<div style={{ marginTop: '40px' }}>
		<div style={hero}>
			<div style={headHeadingAndLead}>
				<h1 style={heroH1}>A Design System for React</h1>
				<p style={lead}>Built for Anephenix</p>
			</div>
			<div className="ctas" style={ctas}>
				<Link href="get-started">
					<a className="button theme-default primary">Get started</a>
				</Link>
				<Link href="docs">
					<a className="button theme-default secondary">
						Documentation
					</a>
				</Link>
			</div>
		</div>
	</div>
);

export default HomePage;
