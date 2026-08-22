import { Code } from "@anephenix/ui";
import DocsLayout from "./DocsLayout.jsx";

const classes = [
	{
		name: ".page",
		description:
			"Full-viewport-width flex column. Applied by the Page component. Wrap your entire app inside it.",
		source: "grid.css",
	},
	{
		name: ".container",
		description:
			"Responsive fixed-width centred container. Width is 100% on mobile/small, 760px on medium, 1024px on large screens.",
		source: "grid.css",
	},
	{
		name: ".withSidePadding",
		description:
			"Adds horizontal padding of --spacer-two (16px) on each side. Combine with .container to keep content from touching the edge.",
		source: "grid.css",
	},
	{
		name: ".container.debug",
		description:
			"Adds a faint red dotted border around the container for debugging layout issues during development.",
		source: "grid.css",
	},
];

const pageSnippet = `import { Page } from '@anephenix/ui';

<Page>
  <NavBar … />
  <main>…</main>
  <Footer … />
</Page>`;

const containerSnippet = `<div className="container withSidePadding">
  <h1>Page heading</h1>
  <p>Content constrained to the grid column width.</p>
</div>`;

const fullSnippet = `import { Page } from '@anephenix/ui';

<Page>
  <NavBar … />

  {/* constrained, padded content area */}
  <div className="container withSidePadding">
    <h1>Welcome</h1>
    <p>Your content here.</p>
  </div>

  <Footer … />
</Page>`;

export default function LayoutPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Layout</h1>
				<p>
					The layout system is a small set of CSS utility classes that structure
					the page at the macro level. They sit above the component library and
					are used to position and constrain content regions.
				</p>

				<h2>Classes</h2>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Class</th>
							<th>Description</th>
							<th>Source</th>
						</tr>
					</thead>
					<tbody>
						{classes.map(({ name, description, source }) => (
							<tr key={name}>
								<td>
									<code>{name}</code>
								</td>
								<td>{description}</td>
								<td>
									<code>{source}</code>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<h2>Page wrapper</h2>
				<p>
					The <code>Page</code> component applies the <code>.page</code> class —
					a full-width flex column that stretches to fill the viewport. Wrap
					your entire app inside it so the layout roots correctly.
				</p>
				<Code code={pageSnippet} language="jsx" />

				<h2>Content container</h2>
				<p>
					Place a <code>.container</code> inside a page section to constrain the
					content to the grid column width. Add <code>.withSidePadding</code> to
					keep content from touching the viewport edge on smaller screens.
				</p>
				<Code code={containerSnippet} language="jsx" />

				<h2>Composing a full page</h2>
				<p>
					A typical page combines <code>Page</code> for the outer shell,{" "}
					<code>NavBar</code> and <code>Footer</code> at full width, and one or
					more <code>.container .withSidePadding</code> sections for the main
					content.
				</p>
				<Code code={fullSnippet} language="jsx" />

				<h2>Responsive container widths</h2>
				<p>
					See the <a href="/docs/grid">Grid</a> page for the exact container
					width at each breakpoint.
				</p>
			</div>
		</DocsLayout>
	);
}
