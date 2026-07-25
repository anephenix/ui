import { Alert, Code, Tabs, Terminal } from "../../dist/index.js";
import SiteLayout from "./SiteLayout.jsx";

const installCode = "npm i @anephenix/ui --save";

const appRouterCode = `// app/layout.jsx
import '@anephenix/ui/dist/index.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

const viteCode = `// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@anephenix/ui/dist/index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`;

const pagesRouterCode = `// pages/_app.jsx
import '@anephenix/ui/dist/index.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}`;

const firstComponentCode = `import { Button, Alert } from '@anephenix/ui';

function MyPage() {
  return (
    <div>
      <Alert variant="success" title="You're all set!">
        @anephenix/ui is installed and ready to use.
      </Alert>

      <Button
        text="Get started"
        className="button theme-default primary"
        onClick={() => console.log('clicked!')}
      />
    </div>
  );
}`;

const pageLayoutCode = `import { Page, NavBar, Footer } from '@anephenix/ui';

export default function RootLayout({ children }) {
  return (
    <Page>
      <NavBar logo={<a href="/">My App</a>} links={[]} loggedIn={false} />
      <main>{children}</main>
      <Footer
        leftSection={<span>© 2026 My Company</span>}
        rightSection={<a href="/privacy">Privacy</a>}
      />
    </Page>
  );
}`;

const tokenOverrideCode = `/* In your own global CSS, after the @anephenix/ui import */
:root {
  /* Swap the primary brand colour */
  --primary-colour: #e11d48;

  /* Use indigo instead of blue for links and focus rings */
  --blue-one-colour: #6366f1;
  --blue-two-colour: #a5b4fc;

  /* Nudge the base font size up */
  --font-size-base: 15px;
}`;

export default function GetStartedPage() {
	const frameworkTabs = [
		{
			id: "app-router",
			label: "Next.js App Router",
			content: (
				<Code title="app/layout.jsx" code={appRouterCode} language="jsx" />
			),
		},
		{
			id: "vite",
			label: "Vite / React",
			content: <Code title="src/main.jsx" code={viteCode} language="jsx" />,
		},
		{
			id: "pages-router",
			label: "Next.js Pages Router",
			content: (
				<Code title="pages/_app.jsx" code={pagesRouterCode} language="jsx" />
			),
		},
	];

	return (
		<SiteLayout>
			<div className="gs-content">
				<h1>Get started</h1>
				<p className="gs-lead">
					@anephenix/ui is a React component library with a plain-CSS design
					system. This guide takes you from installation to your first working
					page in a few minutes.
				</p>

				{/* ── 1. Install ── */}
				<section className="gs-section">
					<h2>1. Install</h2>
					<Terminal title="Install" code={installCode} />
				</section>

				{/* ── 2. Requirements ── */}
				<section className="gs-section">
					<h2>2. Requirements</h2>
					<table className="gs-table">
						<thead>
							<tr>
								<th>Dependency</th>
								<th>Version</th>
								<th>Notes</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Node.js</td>
								<td>24+</td>
								<td>Required for the build tooling</td>
							</tr>
							<tr>
								<td>React</td>
								<td>19+</td>
								<td>Peer dependency — install separately</td>
							</tr>
						</tbody>
					</table>
				</section>

				{/* ── 3. Import the stylesheet ── */}
				<section className="gs-section">
					<h2>3. Import the stylesheet</h2>
					<p>
						All component styles and design tokens live in a single CSS file.
						Import it once at the root of your app — the exact location depends
						on your framework.
					</p>
					<Tabs tabs={frameworkTabs} defaultTab="app-router" />
					<Alert variant="info" title="One import only">
						Do not import the stylesheet more than once. A single root-level
						import covers your entire app.
					</Alert>
				</section>

				{/* ── 4. Your first component ── */}
				<section className="gs-section">
					<h2>4. Your first component</h2>
					<p>
						All components are named exports from <code>@anephenix/ui</code>.
						Import only what you need — the library is tree-shakeable.
					</p>
					<Code title="MyPage.jsx" code={firstComponentCode} language="jsx" />
				</section>

				{/* ── 5. Structuring a page ── */}
				<section className="gs-section">
					<h2>5. Structuring a page</h2>
					<p>
						Use the layout components to scaffold a full page. <code>Page</code>{" "}
						provides the outer shell, <code>NavBar</code> and{" "}
						<code>Footer</code> sit at full width, and a{" "}
						<code>.container.withSidePadding</code> div constrains the main
						content to the grid column.
					</p>
					<Code title="layout.jsx" code={pageLayoutCode} language="jsx" />
				</section>

				{/* ── 6. Customising design tokens ── */}
				<section className="gs-section">
					<h2>6. Customising design tokens</h2>
					<p>
						Every colour, font size, weight, and spacing value is a CSS custom
						property on <code>:root</code>. Override any of them in your own
						global stylesheet — after the <code>@anephenix/ui</code> import —
						and every component that consumes that token will update
						automatically.
					</p>
					<Code title="globals.css" code={tokenOverrideCode} language="css" />
					<p>
						See the <a href="/docs/colours">Colours</a>,{" "}
						<a href="/docs/typography">Typography</a>, and{" "}
						<a href="/docs/grid">Grid</a> pages for the full list of available
						tokens.
					</p>
				</section>

				{/* ── 7. Next steps ── */}
				<section className="gs-section">
					<h2>7. Next steps</h2>
					<ul className="gs-next-steps">
						<li>
							<a href="/docs/components">Browse all components</a> — forms,
							layout, display, overlays, and more
						</li>
						<li>
							<a href="/docs/colours">Colours</a> — the full colour palette and
							how it maps to component variants
						</li>
						<li>
							<a href="/docs/grid">Grid</a> — spacing scale and responsive
							breakpoints
						</li>
						<li>
							<a href="/docs/typography">Typography</a> — type scale, font
							families, and heading rules
						</li>
						<li>
							<a href="/docs/layout">Layout</a> — page, container, and padding
							utilities
						</li>
					</ul>
				</section>
			</div>
		</SiteLayout>
	);
}
