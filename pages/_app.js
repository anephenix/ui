import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { NavBar, Page, Footer } from '../dist';

// Data
import links from '../data/navbar-links';

// Styling
import '../dist/index.css';

// Other files
import '../styles/docs.scss';
import '../styles/get-started.scss';
import '../styles/index.scss';

const UKFlag = ({ width = 60, height = 30 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 60 30"
		width={width}
		height={height}
	>
		<clipPath id="s">
			<path d="M0,0 v30 h60 v-30 z" />
		</clipPath>
		<clipPath id="t">
			<path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
		</clipPath>
		<g clipPath="url(#s)">
			<path d="M0,0 v30 h60 v-30 z" fill="#012169" />
			<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
			<path
				d="M0,0 L60,30 M60,0 L0,30"
				clipPath="url(#t)"
				stroke="#C8102E"
				strokeWidth="4"
			/>
			<path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
			<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
		</g>
	</svg>
);

const LeftSection = () => (
	<div className='copyright'>
		&copy; {new Date().getFullYear()}{' '}
		<a
			href="https://anephenix.com"
			rel="noopen noreferrer"
			target="_blank"
		>
			Anephenix
		</a>
		. UI is licensed under the{' '}
		<a
			href="https://raw.githubusercontent.com/anephenix/ui/master/LICENSE"
			rel="noopen noreferrer"
			target="_blank"
		>
			MIT License
		</a>
		.
	</div>	
);
const RightSection = () => (
	<div className='made-in-location'>
		<UKFlag width={24} height={12} />
		<a
			href="https://www.gov.uk"
			rel="noopen noreferrer"
			target="_blank"
		>
			&nbsp; Made in the United Kingdom
		</a>
	</div>
);

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		const logo = (
			<Link href="/">
				<div
					style={{
						fontWeight: 'bold',
						cursor: 'pointer',
					}}
					id="logo"
				>
					UI
				</div>
			</Link>
		);
		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<title>UI - a design system from Anephenix</title>
				</Head>
				<Page>
					<NavBar
						logo={logo}
						links={links}
						loggedIn={false}
						Link={Link}
					/>
					<div className="page container withSidePadding">
						<Component {...pageProps} />
					</div>
					<Footer leftSection={<LeftSection />} rightSection={<RightSection />} />
				</Page>
			</>
		);
	}
}
export default MyApp;
