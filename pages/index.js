import React from 'react';
import Link from 'next/link';
import '../styles/index.scss';

const ctas = [
	{ href: '/get-started', text: 'Get started', buttonClass: 'primary' },
	{ href: '/docs', text: 'Documentation', buttonClass: 'secondary' },
];

const CTA = ({ href, text, buttonClass }, i) => (
	<Link key={i} href={href}>
		<a className={`button theme-default ${buttonClass}`}>{text}</a>
	</Link>
);

const HomePage = () => (
	<div style={{ marginTop: '40px' }}>
		<div className="hero">
			<div className="heading-and-lead">
				<h1>A Design System for React</h1>
				<p>Built for Anephenix</p>
			</div>
			<div className="hero-ctas">{ctas.map(CTA)}</div>
		</div>
	</div>
);

export default HomePage;
