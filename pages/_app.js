import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { Theme, NavBar } from '../index';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		const logo = (
			<Link href="/">
				<div style={{ fontWeight: 'bold' }} id="logo">
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
				<Theme>
					<NavBar logo={logo} links={[]} />
					<div className="page container withSidePadding">
						<Component {...pageProps} />
					</div>
				</Theme>
			</>
		);
	}
}
export default MyApp;