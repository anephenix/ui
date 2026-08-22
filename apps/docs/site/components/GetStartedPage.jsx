import { Alert, Code, Tabs, Terminal } from "@anephenix/ui";
import { useState } from "react";
import SiteLayout from "./SiteLayout.jsx";

const install = {
	react: "npm i @anephenix/ui --save",
	svelte: "npm i @anephenix/ui-svelte --save",
};

const appRouterCode = `// app/layout.jsx
import '@anephenix/ui/dist/index.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}`;

const viteReactCode = `// src/main.jsx
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

const svelteKitLayoutCode = `<!-- src/routes/+layout.svelte -->
<script>
	import '@anephenix/ui-svelte/dist/index.css';
	let { children } = $props();
</script>

{@render children()}`;

const viteSvelteCode = `// src/main.js
import '@anephenix/ui-svelte/dist/index.css';
import { mount } from 'svelte';
import App from './App.svelte';

mount(App, { target: document.getElementById('app') });`;

const firstComponentReactCode = `import { Button, Alert } from '@anephenix/ui';

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

const firstComponentSvelteCode = `<script>
	import { Alert, Button } from '@anephenix/ui-svelte';
</script>

<Alert variant="success" title="You're all set!">
	@anephenix/ui-svelte is installed and ready to use.
</Alert>

<Button
	text="Get started"
	class="button theme-default primary"
	onclick={() => console.log('clicked!')}
/>`;

const pageLayoutReactCode = `import { Page, NavBar, Footer } from '@anephenix/ui';

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

const pageLayoutSvelteCode = `<script>
	import { Footer, NavBar, Page } from '@anephenix/ui-svelte';
	let { children } = $props();
</script>

<Page>
	<NavBar links={[]} loggedIn={false}>
		{#snippet logo()}<a href="/">My App</a>{/snippet}
	</NavBar>
	<main>{@render children()}</main>
	<Footer>
		{#snippet leftSection()}<span>&copy; 2026 My Company</span>{/snippet}
		{#snippet rightSection()}<a href="/privacy">Privacy</a>{/snippet}
	</Footer>
</Page>`;

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
	const [framework, setFramework] = useState("react");
	const isReact = framework === "react";
	const pkg = isReact ? "@anephenix/ui" : "@anephenix/ui-svelte";

	const frameworkTabs = isReact
		? [
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
					content: (
						<Code title="src/main.jsx" code={viteReactCode} language="jsx" />
					),
				},
				{
					id: "pages-router",
					label: "Next.js Pages Router",
					content: (
						<Code
							title="pages/_app.jsx"
							code={pagesRouterCode}
							language="jsx"
						/>
					),
				},
			]
		: [
				{
					id: "sveltekit",
					label: "SvelteKit",
					content: (
						<Code
							title="+layout.svelte"
							code={svelteKitLayoutCode}
							language="svelte"
						/>
					),
				},
				{
					id: "vite-svelte",
					label: "Vite / Svelte",
					content: (
						<Code
							title="src/main.js"
							code={viteSvelteCode}
							language="javascript"
						/>
					),
				},
			];

	return (
		<SiteLayout>
			<div className="gs-content">
				<h1>Get started</h1>
				<p className="gs-lead">
					A plain-CSS design system available for both React (
					<code>@anephenix/ui</code>) and Svelte (
					<code>@anephenix/ui-svelte</code>). This guide takes you from
					installation to your first working page in a few minutes.
				</p>

				<div className="live-preview-toggle">
					<button
						type="button"
						className={isReact ? "active" : ""}
						onClick={() => setFramework("react")}
					>
						React
					</button>
					<button
						type="button"
						className={!isReact ? "active" : ""}
						onClick={() => setFramework("svelte")}
					>
						Svelte
					</button>
				</div>

				{/* ── 1. Install ── */}
				<section className="gs-section">
					<h2>1. Install</h2>
					<Terminal title="Install" code={install[framework]} />
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
								<td>{isReact ? "React" : "Svelte"}</td>
								<td>{isReact ? "19+" : "5+"}</td>
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
					<Tabs
						tabs={frameworkTabs}
						defaultTab={isReact ? "app-router" : "sveltekit"}
					/>
					<Alert variant="info" title="One import only">
						Do not import the stylesheet more than once. A single root-level
						import covers your entire app.
					</Alert>
				</section>

				{/* ── 4. Your first component ── */}
				<section className="gs-section">
					<h2>4. Your first component</h2>
					<p>
						All components are named exports from <code>{pkg}</code>. Import
						only what you need — the library is tree-shakeable.
					</p>
					{isReact ? (
						<Code
							title="MyPage.jsx"
							code={firstComponentReactCode}
							language="jsx"
						/>
					) : (
						<Code
							title="MyPage.svelte"
							code={firstComponentSvelteCode}
							language="svelte"
						/>
					)}
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
					{isReact ? (
						<Code
							title="layout.jsx"
							code={pageLayoutReactCode}
							language="jsx"
						/>
					) : (
						<Code
							title="+layout.svelte"
							code={pageLayoutSvelteCode}
							language="svelte"
						/>
					)}
				</section>

				{/* ── 6. Customising design tokens ── */}
				<section className="gs-section">
					<h2>6. Customising design tokens</h2>
					<p>
						Every colour, font size, weight, and spacing value is a CSS custom
						property on <code>:root</code>. Override any of them in your own
						global stylesheet — after the <code>{pkg}</code> import — and every
						component that consumes that token will update automatically. Both
						packages are built from the same design tokens, so overrides apply
						identically to either.
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
