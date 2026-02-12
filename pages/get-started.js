import React from "react";
import { Terminal, Code } from "../dist";

const appCode = `
import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import { Page } from '@anephenix/ui';

// Style dependencies
import '@anephenix/ui/dist/index.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head />
        <Page>
          <Component {...pageProps} />
        </Page>
      </>
    );
  }
}
export default MyApp;`;

const GetStartedPage = () => {
	return (
		<div className="section-gap">
			<div className="section-gap">
				<h2>Install</h2>
				<Terminal code="npm i @anephenix/ui" title="Install UI" />
			</div>
			<div className="section-gap">
				<h2>Dependencies</h2>
				<ul>
					<li>Node.js (V 22 and greater)</li>
					<li>React (V 18)</li>
				</ul>
			</div>
			<div className="section-gap">
				<h2>Usage</h2>
				<p>
					To use the library in your codebase, you will want to setup your
					pages/_app.js file like this:
				</p>
				<Code title="pages/_app.js" code={appCode} />
			</div>
		</div>
	);
};

export default GetStartedPage;
