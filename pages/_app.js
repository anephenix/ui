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

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		const logo = (
			<Link href="/">
				<div
					style={{ fontWeight: 'bold', cursor: 'pointer' }}
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
					<NavBar logo={logo} links={links} loggedIn={false} Link={Link} />
					<div className="page container withSidePadding">
						<Component {...pageProps} />
					</div>
					<Footer />
				</Page>
			</>
		);
	}
}
export default MyApp;
